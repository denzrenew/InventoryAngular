import WalletsModel from "src/app/core/models/wallets.model";
import { UserProfile } from "../../dashboards/default/interfaces/user-profile.interface";
import { Charts, LoadingScreens } from "./admin-dashboard.interfaces";
import AdminDashboardModels from "./admin-dashboard.models";

const defaultWallet = (): WalletsModel => {
    return {
        mainWallet: 0.00,
        directWallet: {
            transferred: 0.00,
            untransferred: 0.00
        },
        monthlyWallet: {
            transferred: 0.00,
            untransferred: 0.00
        },
        groupWallet: {
            transferred: 0.00,
            untransferred: 0.00
        },
        totalLifetimeEarnings: 0.00
    }
}

const loading = (): LoadingScreens => {
    return {
        profile: true,
        efficiency: true,
        wallets: {
          direct: true,
          monthly: true,
          group: true,
        },
        myNetwork: true,
        referrals: {
          direct: true,
          unallocated: true
        }
    }
}

const charts: Charts = {
    pieChart: {
        chart: {
            height: 320,
            type: 'donut',
        },
        series: [1, 0],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: -10
        },
        dataLabels: {
            formatter: (val, opts) => `${(val * 2).toFixed(2)}%`,
        },
        labels: ['Remaining', 'Monthly', ],
        colors: ['#CCC', '#34c38f', ],
        responsive: [{
            breakpoint: 600,
            options: {
                chart: {
                    height: 240
                },
                legend: {
                    show: false
                },
            }
        }],
    },
    totalEarningsChart: {
        series: [{
            name: 'Direct Referral',
            data: [59, 74, 35, 7, 95, 7, 30, 81, 24, 61, 7]
        }],
        chart: {
            type: 'area',
            height: 40,
            sparkline: { enabled: true },
            events: {
                animationEnd: (c, o)  => {
                    const apxElems = document.querySelectorAll('apx-chart.cloneable');
                    apxElems.forEach(apxElem => {
                        const clonedElem = apxElem.cloneNode(true);
                        apxElem.parentNode.replaceChild(clonedElem, apxElem);
                    });
                }
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#73a580'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [25, 100, 100, 100]
            },
        },
        tooltip: {
            fixed: { enabled: false },
            x: { show: false },
            marker: { show: false }
        }
    },
    directBonusChart: {
        series: [{
            name: 'Direct Referral',
            data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
        }],
        chart: {
            type: 'area',
            height: 40,
            sparkline: {
                enabled: true
            },
            events: {
                mouseMove: undefined,
                mouseLeave: undefined
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#f1b44c'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [25, 100, 100, 100]
            },
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            marker: {
                show: false
            }
        }
    },
    monthlyBonusChart: {
        series: [{
            name: 'Monthly Bonus',
            data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
        chart: {
            type: 'area',
            height: 40,
            sparkline: {
                enabled: true
            },
            selection: {
                enabled: false,
            },
            events: {
                animationEnd: (c, o)  => {
                    const apxElems = document.querySelectorAll('apx-chart.cloneable');
                    apxElems.forEach(apxElem => {
                        const clonedElem = apxElem.cloneNode(true);
                        apxElem.parentNode.replaceChild(clonedElem, apxElem);
                    });
                }
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#3452e1'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [25, 100, 100, 100]
            },
        },
        tooltip: {
            enabled: false,
            x: {
                show: false,
            }
        }
    },
    groupBonusChart: {
        series: [{
            name: 'Group Bonus',
            data: [35, 53, 93, 47, 54, 24, 47, 75, 65, 19, 14],
            tooltip: {
                enabled: false
            }
        }],
        chart: {
            type: 'area',
            height: 40,
            sparkline: {
                enabled: true
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#50a5f1'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [25, 100, 100, 100]
            },
        },
        tooltip: {
            enabled: false,
            onDatasetHover: {
                highlightDataSeries: false,
            },
            marker: {
                show: false,
            },
            items: {
               display: "flex",
            },
            fixed: {
                enabled: false,
            },
        }
    }
}

const models: AdminDashboardModels = {
    userProfile: {
        accountType: "subscription",
        birthDate: null,
        country: "",
        countryCode: "",
        email: "",
        firstName: "",
        isActive: true,
        lastName: "",
        middleName: "",
        mobile: "",
        profilePicture: "",
        referralCode: "",
    },
    efficiencyData: {
        remaining: 0,
        direct: 0,
        monthly: 0,
        group: 0
    },
    wallets: defaultWallet(),
    unallocatedUsers: [],
    directReferralUsers: [],
    contractAmount: 0,
    series: [1, 0]
}

const userProfile: UserProfile = {
    accountType: "subscription",
    birthDate: null,
    country: "",
    countryCode: "",
    email: "",
    firstName: "",
    isActive: true,
    lastName: "",
    middleName: "",
    mobile: "",
    profilePicture: "",
    referralCode: "",
}

const wallets: WalletsModel = {
    directWallet: {
        transferred: 0,
        untransferred: 0,
    },
    groupWallet: {
        transferred: 0,
        untransferred: 0,
    },
    monthlyWallet: {
        transferred: 0,
        untransferred: 0,
    },
    mainWallet: 0,
    totalLifetimeEarnings: 0
}

export { loading, charts, models, userProfile, wallets };
