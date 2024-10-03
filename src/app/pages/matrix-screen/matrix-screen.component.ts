import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as d3 from 'd3';
import * as d3OrgChart from 'd3-org-chart';
import { ToastrService } from 'ngx-toastr';
import { MatrixService } from 'src/app/core/services/matrix.service';
import { ApiResponse } from '../dashboards/default/interfaces/response.interface';
import Matrix from 'src/app/core/models/group/matrix.model';
import OrgChartModel, { LEFT_SIDE, RIGHT_SIDE } from './org-chart.model';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { GroupService } from 'src/app/core/services/group.service';
import { Observable, Observer, debounceTime } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import UnallocatedUsers from 'src/app/core/models/group/unallocated.model';
import { environment } from 'src/environments/environment';

const GENEALOGY = "GENEALOGY";
const ALLOCATE = "ALLOCATE";
const NO_USER = "NO USER";

@Component({
  selector: 'app-matrix-screen',
  templateUrl: './matrix-screen.component.html',
  styleUrls: ['./matrix-screen.component.scss']
})
export class MatrixScreenComponent {
  @ViewChild('popoverUnallocated', { static: true }) popoverUnallocated!: TemplateRef<any>;
  @ViewChild('allocateModal') allocateModal: TemplateRef<any>;

  modalRef?: BsModalRef;
  isFirstLoad: boolean = true;
  isSubmitting: boolean = false;
  isSearching: boolean = false;
  isFirstSearch: boolean = true;
  disableAscendBtn: boolean = true;
  formaction: string = "";
  error: string = "";
  userid: number = 0;

  unallocatedUserId: string = "";
  firstName: string = "";
  lastName: string = "";
  searchText: string = "";
  personalReferralCode: string = ""; // The currently logged in user's referral code

  allocatedUsers: Matrix[] = [];
  displayData: OrgChartModel[] = [];
  searchResult: Matrix[] = [];
  unallocatedUsers: UnallocatedUsers[] = [];
  chart: any;

  form: FormGroup;

  // Used in the modal
  selectedUser?: Matrix;
  selectedPosition: number = 0;
  
  constructor(
    private toastr: ToastrService, 
    private route: ActivatedRoute, 
    private router: Router,
    private matrixService: MatrixService,
    private groupService: GroupService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      searchText: ['', [ ]],
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const action: string = params['fucntion'];
      this.formaction = action ? action.toUpperCase() : GENEALOGY;
      this.userid = params['userid'] ?? 0; 

      // the user to be allocated
      this.unallocatedUserId = params['unallocatedUserId'] ?? ''

      if(this.formaction === ALLOCATE) {
        this.lastName = params['lastName'];
        this.firstName = params['firstName'];
      }
    });

    if (!this.userid)  {
      this.getMatrix();
    } else {
      this.getMatrixByUserId(this.userid)
    }

    if(this.formaction.toUpperCase() === GENEALOGY) {
      this.getUnallocatedUsers();
    }
  }

  /**
   * Generates the display data for the org chart
   * @param id 
   */
  private generateDisplayData(id: number = -1): void {
    const parent = id === -1 
      ? this.allocatedUsers.find(i => i.parentUserId === null)
      : this.allocatedUsers.find(i => i.childUserId === id);
    
    const level2Users = this.allocatedUsers.filter(i => i.parentUserId === parent.childUserId);
    const level2UsersIds = level2Users.map(i => i.childUserId);

    const level3Users = this.allocatedUsers.filter(i => level2UsersIds.includes(i.parentUserId));
    const level3UsersIds = level3Users.map(i => i.childUserId);
    const level4Users = this.allocatedUsers.filter(i => level3UsersIds.includes(i.parentUserId));

    const finalUsers = [ parent, ...level2Users, ...level3Users, ...level4Users ];
    
    const transformedData: OrgChartModel[] = finalUsers.map((user, index) => {
      return {
        id: user.childUserId,
        parentId: index === 0 ? null : user.parentUserId,
        referralCode: user.childReferralCode,
        contractAmount: user.contractAmount,
        position: index === 0 ? index : user.placementSide === LEFT_SIDE ? LEFT_SIDE : RIGHT_SIDE,
        firstName: index === 0 && user.childReferralCode === this.personalReferralCode ? "YOU" : user.childFirstName,
        lastName: index === 0 && user.childReferralCode === this.personalReferralCode ? "YOU" : user.childLastName
      }
    });

    // Check for level 2 users if there are unallocated spaces
    if(level2Users.length === 1) {
      const level2User = level2Users[0];
      const filledPosition = level2User.placementSide;
      const unallocatedLevel2Entity: OrgChartModel = this.generateUnallocatedEntry(level2User.parentUserId, filledPosition === LEFT_SIDE ? RIGHT_SIDE : LEFT_SIDE, this.formaction !== ALLOCATE);

      transformedData.push(unallocatedLevel2Entity);
    } else if (level2Users.length === 0) {
      transformedData.push(this.generateUnallocatedEntry(parent.childUserId, RIGHT_SIDE));
      transformedData.push(this.generateUnallocatedEntry(parent.childUserId, LEFT_SIDE));
    }

    // Check for level 3 users if there are unallocated spaces
    if(level3Users.length < 4 && level2Users.length > 0 && level2Users.length <= 2) {
      if(level2Users[0]) {
        const left = this.allocatedUsers.find(i => i.placementSide === LEFT_SIDE && i.parentUserId === level2Users[0].childUserId);
        const right = this.allocatedUsers.find(i => i.placementSide === RIGHT_SIDE && i.parentUserId === level2Users[0].childUserId);

        !left && transformedData.push(this.generateUnallocatedEntry(level2Users[0].childUserId, LEFT_SIDE));
        !right && transformedData.push(this.generateUnallocatedEntry(level2Users[0].childUserId, RIGHT_SIDE));
      }

      if(level2Users[1]) {
        const left = this.allocatedUsers.find(i => i.placementSide === LEFT_SIDE && i.parentUserId === level2Users[1].childUserId);
        const right = this.allocatedUsers.find(i => i.placementSide === RIGHT_SIDE && i.parentUserId === level2Users[1].childUserId);

        !left && transformedData.push(this.generateUnallocatedEntry(level2Users[1].childUserId, LEFT_SIDE));
        !right && transformedData.push(this.generateUnallocatedEntry(level2Users[1].childUserId, RIGHT_SIDE));
      }
    }

    // Level 4 Users
    if(level4Users.length < 8 && level3Users.length > 0) {
      if(level3Users[0]) {
        const left = this.allocatedUsers.find(i => i.placementSide === LEFT_SIDE && i.parentUserId === level3Users[0].childUserId);
        const right = this.allocatedUsers.find(i => i.placementSide === RIGHT_SIDE && i.parentUserId === level3Users[0].childUserId);

        !left && transformedData.push(this.generateUnallocatedEntry(level3Users[0].childUserId, LEFT_SIDE));
        !right && transformedData.push(this.generateUnallocatedEntry(level3Users[0].childUserId, RIGHT_SIDE));
      }

      if(level3Users[1]) {
        const left = this.allocatedUsers.find(i => i.placementSide === LEFT_SIDE && i.parentUserId === level3Users[1].childUserId);
        const right = this.allocatedUsers.find(i => i.placementSide === RIGHT_SIDE && i.parentUserId === level3Users[1].childUserId);

        !left && transformedData.push(this.generateUnallocatedEntry(level3Users[1].childUserId, LEFT_SIDE));
        !right && transformedData.push(this.generateUnallocatedEntry(level3Users[1].childUserId, RIGHT_SIDE));
      }

      if(level3Users[2]) {
        const left = this.allocatedUsers.find(i => i.placementSide === LEFT_SIDE && i.parentUserId === level3Users[2].childUserId);
        const right = this.allocatedUsers.find(i => i.placementSide === RIGHT_SIDE && i.parentUserId === level3Users[2].childUserId);

        !left && transformedData.push(this.generateUnallocatedEntry(level3Users[2].childUserId, LEFT_SIDE));
        !right && transformedData.push(this.generateUnallocatedEntry(level3Users[2].childUserId, RIGHT_SIDE));
      }

      if(level3Users[3]) {
        const left = this.allocatedUsers.find(i => i.placementSide === LEFT_SIDE && i.parentUserId === level3Users[3].childUserId);
        const right = this.allocatedUsers.find(i => i.placementSide === RIGHT_SIDE && i.parentUserId === level3Users[3].childUserId);

        !left && transformedData.push(this.generateUnallocatedEntry(level3Users[3].childUserId, LEFT_SIDE));
        !right && transformedData.push(this.generateUnallocatedEntry(level3Users[3].childUserId, RIGHT_SIDE));
      }
    }

    this.displayData = this.organizeMatrixList(transformedData);
    this.disableAscendBtn = parent.parentUserId === null;
  }

  private generateUnallocatedEntry(parentId: number, filledPosition: number, isGenealogy: boolean = false): OrgChartModel {
    return {
      id: `${parentId}.${filledPosition === LEFT_SIDE ? LEFT_SIDE : RIGHT_SIDE}`,
      parentId,
      referralCode: "Unallocated",
      position: filledPosition,
      firstName: null,
      lastName: null
    }
  }

  /**
   * Organizes the list of data
   * @param list 
   * @returns 
   */
   private organizeMatrixList(list: OrgChartModel[]): OrgChartModel[] {
    const parent = list.find(i => i.parentId === null);
    const level2Users = list.filter(i => i.parentId === parent.id);
    const level2UsersParentIds = level2Users.map(i => i.id);

    const level3Users = list.filter(i => level2UsersParentIds.includes(i.parentId));
    const level3UsersParentIds = level3Users.map(i => i.id);

    const level4Users = list.filter(i => level3UsersParentIds.includes(i.parentId));

    const level2Matrix = [ level2Users.find(i => i.position === LEFT_SIDE), level2Users.find(i => i.position === RIGHT_SIDE) ];

    const level3Matrix = [
      level3Users.find(i => i.position === LEFT_SIDE && i.parentId === level2Users[0]?.id),
      level3Users.find(i => i.position === RIGHT_SIDE && i.parentId === level2Users[0]?.id),
      level3Users.find(i => i.position === LEFT_SIDE && i.parentId === level2Users[1]?.id),
      level3Users.find(i => i.position === RIGHT_SIDE && i.parentId === level2Users[1]?.id),
    ];

    const level4Matrix = [
      level4Users.find(i => i.position === LEFT_SIDE && i.parentId === level3Users[0]?.id),
      level4Users.find(i => i.position === RIGHT_SIDE && i.parentId === level3Users[0]?.id),
      
      level4Users.find(i => i.position === LEFT_SIDE && i.parentId === level3Users[1]?.id),
      level4Users.find(i => i.position === RIGHT_SIDE && i.parentId === level3Users[1]?.id),

      level4Users.find(i => i.position === LEFT_SIDE && i.parentId === level3Users[2]?.id),
      level4Users.find(i => i.position === RIGHT_SIDE && i.parentId === level3Users[2]?.id),

      level4Users.find(i => i.position === LEFT_SIDE && i.parentId === level3Users[3]?.id),
      level4Users.find(i => i.position === RIGHT_SIDE && i.parentId === level3Users[3]?.id),
    ];

    return [ parent, ...level2Matrix, ...level3Matrix, ...level4Matrix ].filter(i => i);
  }
  
  private getMatrixByUserId(userId: number) {
    this.generateDisplayData(userId);
    this.loadOrgChart();
  }

  private loadOrgChart(): void {
    d3.selectAll("svg > *").remove();
    this.chart = new d3OrgChart.OrgChart()
      .container('div.chart-container')
      .data(this.displayData)
      .nodeWidth((d) => 150)
      .initialZoom(0.9)
      .nodeHeight((d) => 90)
      .childrenMargin((d) => 40)
      .compactMarginBetween((d) => 15)
      .compactMarginPair((d) => 80)
      .onNodeClick(this.nodeClickEvent)
      .nodeContent((d, i, arr, state) => this.generateOrgChartContent(d, i, arr, state, this.formaction))
      .render();
      
    this.chart.expandAll();
    this.chart.updateNodesState();
    window.setTimeout(() => {
      document.querySelectorAll('.node').forEach(node => node.hasAttribute('cursor') && node.removeAttribute('cursor'));
      document.querySelectorAll('div.node-button-div').forEach(node => node.classList.add('mt-4'))
    }, 500);
  }

  /**
   * Click event for the org's nodes
   * The reason this acts as a anonymous function is because of accessing "this" keyword
   * @param d 
   */
  private nodeClickEvent = (d: any): void => {
    if(typeof(d) === "string") {
      const { [0]: parentId, [1]: position} = d.split(".");
      this.allocate(parseInt(parentId), parseInt(position));
    } else {
      const unallocatedUser = this.allocatedUsers.find(i => i.childUserId === d);
      this.viewChild(unallocatedUser);
    }
  }

  /**
   * Generates the org chart's HTML
   * @param d 
   * @param i 
   * @param arr 
   * @param state 
   * @returns 
   */
  private generateOrgChartContent(d: any, i: number, arr: any, state: any, formAction: string): string {
    const { height, width, data } = d;
    const { id, firstName, lastName, referralCode, contractAmount } = data;

    const nodeHeight = `${height}px`;
    const disabled = referralCode.toUpperCase() === "UNALLOCATED" && formAction === GENEALOGY;
    const backgroundColor = referralCode.toUpperCase() === "UNALLOCATED" 
      ? formAction === GENEALOGY 
        ? '#CCC'
        : '#ebc934' 
      : '#ffffff';
    const connectorHeight = `${10}px`;
    const connectorWidth = `${width - 2}px`;
    const displayName = lastName && firstName
      ? lastName === "YOU" 
        ? "YOU" 
        : `${lastName[0].toUpperCase()}${lastName.substring(1)}, ${firstName[0].toUpperCase()}`
      : null;

    return `
    <div style="padding-top:30px;background-color:none;margin-left:1px;height:${height}px;border-radius:8px;overflow:visible;${disabled ? 'cursor:not-allowed !important;pointer-events:none;' : ''}">
        <div style="height:${nodeHeight};padding-top:0px;background-color:${backgroundColor};border:1px solid #ddd;border-radius:8px;box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);transition: background-color 0.3s ease-in-out;">
            <div style="margin-top:-30px;background-color:#3AB6E3;height:${connectorHeight};width:${connectorWidth};border-radius:4px;"></div>
            
            <div class='text-truncate' style="padding:20px; padding-top:${displayName ? '27px' : '35px'};text-align:center;cursor:pointer;">
                <div style="color:#111672;font-size:15px;font-weight:bold;">
                    ${displayName ? `<h6 class='text-info' style='font-weight: 500;'>${displayName}</h6>` : ''}
                    ${contractAmount ? `<span class='text-success mb-3'> ${contractAmount}</span>` : ''}
                    <br>
                    <a href="javascript:void(0)" style="text-decoration:none;color:#111672;margin-top:5px;">${referralCode}</a>
                </div>
            </div> 
        </div>
    </div>`;
  }
  
  /**
   * Allocates the user and opens a modal
   * @param parentId 
   * @param position 
   */
  allocate(parentId: number, position: number) {
    this.selectedUser = this.allocatedUsers.find(i => i.childUserId === parentId);
    this.selectedPosition = position === LEFT_SIDE ? LEFT_SIDE : RIGHT_SIDE;
    
    if(this.formaction === ALLOCATE) {
      this.modalRef = this.modalService.show(this.allocateModal, { class: 'modal-md' });
    } else if(this.formaction === GENEALOGY) {
      this.modalRef = this.modalService.show(this.popoverUnallocated, { class: 'modal-lg' });
    }
  }

  viewChild(user: Matrix) {
    this.getMatrixByUserId(user.childUserId);
  }

  /**
   * Capitalizes the first letter
   * @param name 
   * @returns 
   */
  capitalize(name: string): string {
    return name ? name[0].toUpperCase() + name.substring(1) : name;
  }

  getChildName(): string {
    if(this.selectedUser.id <= 0) {
      return "YOU";
    }

    const childLastName = this.capitalize(this.selectedUser.childLastName);
    const childFirstName = this.capitalize(this.selectedUser.childFirstName);

    return `${childLastName}, ${childFirstName}`;
  }
  

  /* ========== EVENT FUNCTIONS ========== */
  
  /**
   * Close the opened modal
   */
  closeModal(): void {
    this.modalRef.hide();
  }

  /**
   * Click event when going 1 level upward
   */
  ascendOnceBtnClick(): void {
    const previousEntity = this.allocatedUsers.find(i => i.childUserId === this.displayData[0].id);
    if(previousEntity) {
      this.generateDisplayData(previousEntity.parentUserId);
      this.loadOrgChart();
    }
  }

  /**
   * Called when the search item is clicked
   * @param user 
   */
  searchItemClick(user: Matrix): void {
    const foundUser = this.allocatedUsers.find(i => i.id === user.id);
    if(foundUser) {
      this.viewChild(user);
    }
  }


  /* ========== API CALLS ========== */
  /**
   * Retrieves the list of unallocated users
   */
  private getUnallocatedUsers(): void {
    this.groupService.getUnPositionedUsers(
      (response: ApiResponse<UnallocatedUsers[]>) => {
        if(response && response.status === 'success') {
          this.unallocatedUsers = response.data.map(i => {
            i.createdDate = new Date(i.createdDate);
  
            return i;
          });
        }
      }, 
      (error: any) => !environment.production && console.log("Failed to get unallocated users", error), 
      () => !environment.production && console.log(this.unallocatedUsers));
  }
  
  /**
   * Searches for users based on the provided search keyword
   */
  searchForUser(): void {
    this.isSearching = true;
    this.searchResult = [];

    const success = (response: ApiResponse<Matrix[]>) => {
      if(response && response.status === "success") {
        this.searchResult = response.data.map(i => {
          i.childFirstName = i.childFirstName[0].toUpperCase() + i.childFirstName.substring(1);
          i.childLastName = i.childLastName[0].toUpperCase() + i.childLastName.substring(1);

          return i;
        });
      }
    }

    const error = (error: any) => { console.log("There's an error while searching"); }
    const complete = () => {
      this.isSearching = false;
      this.isFirstSearch = false;
    }
    
    // Create an observable and apply debounceTime
    const searchObservable = new Observable<void>((observer: Observer<void>) => {
      this.groupService.searchMyNetwork(success, error, complete, this.form.controls['searchText'].value);
      observer.next(); // Emit a value to trigger the debounceTime
      observer.complete();
    });

    searchObservable
      .pipe(debounceTime(1500)) // 1.5 seconds delay
      .subscribe();
  }

  /**
   * Retrieves the list of allocated users from the server
   */
  private getMatrix(): void {
    const success = (response: ApiResponse<Matrix[]>) => {
      if(response && response.status === 'success') {
        this.allocatedUsers = response.data;
        console.log(this.allocatedUsers);
        if(response.data[0].id === 0) {
          this.personalReferralCode = response.data[0].childReferralCode;
        }
      }
    }

    const error = (error: any) => console.log("Error on getMatrix");
    const complete = () => {
      this.generateDisplayData();
      this.loadOrgChart();

      this.isFirstLoad = false;
    }

    this.matrixService.getAccountGroupMatrix(success, error, complete);
  }

  /**
   * Allocates the selected user
   */
  submitAllocation(): void {
    this.isSubmitting = true;
    const success = (response: ApiResponse<null>) => {
      if(response && response.status === 'success') {
        this.toastr.success("Successfully allocated user!");

        if(this.formaction.toUpperCase() === GENEALOGY) {
          // Restart matrix
          this.getMatrix();
          this.closeModal();
        }
      }
    }

    const error = (error: any) => {
      if(error) {
        this.toastr.error(`Failed to allocate with reason: ${error}`);
      } else {
        this.toastr.error("Failed to allocate user! Please contact our administrator(s).");
      }
    }

    const complete = () => {
      this.closeModal();
      if(this.formaction === ALLOCATE) {
        this.router.navigate(["/dashboard"]);
      } else {
        this.modalRef?.hide();
      }
    }

    const data = {
      childUserId: parseInt(this.unallocatedUserId),
      parentUserId: this.selectedUser.childUserId,
      placementSide: this.selectedPosition
    }
    
    this.matrixService.allocateMember(success, error, complete, data);
  }

  setUnallocatedUser(userId: string): void {
    this.unallocatedUserId = userId;
    this.submitAllocation();
  }

}
