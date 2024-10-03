import SimpleTableDefinitionModel from "./simple-table.definition-model";

/**
 * State model for the simple table component
 */
export default interface StateModel<T> {
    /**
     * Property that determines that the component is loading
     */
    loading: boolean;

    /**
     * Determines if the aggregate is loading
     */
    loadingAggregate?: boolean;

    /**
     * The name of the table or it's description
     */
    tableName: string;

    /**
     * The `this` keyword.
     */
    readonly parentComponent: any;

    /**
     * Data that will be provided based from the passed argument
     */
    model: T[];

    /**
     * Table definition of the data
     */
    definition: SimpleTableDefinitionModel[];

    /**
     * Combines the property to a single property. Mostly used for the `total`
     */
    aggregate?: number;

    /**
     * Name of the column where aggregate will be based
     */
    aggregateColumn?: string;

    /**
     * Callback to retrieve the aggregate data
     */
    aggregateCb?: Function;

    /**
     * Function called on initialization of the component
     */
    readonly onInitFn: Function;

    /**
     * Invokes a callback function when the previous button is triggered
     */
    readonly onPrevClickFn: Function;

    /**
     * Invokes a callback function when the next button is triggered
     */
    readonly onNextClickFn: Function;

    /**
     * Invokces a callback function when a specific page number is triggered
     */
    readonly onPageSelectFn: Function;

    // ================= PAGINATION START =================
    /**
     * The page size to be displayed
     */
    pageSize: number;

    /**
     * Number of pages (not required to be set)
     */
    pagesArray?: number[];

    /**
     * Total record count
     */
    totalRecordCount: number;

    /**
     * The current page of the table
     */
    currentPage: number;
    // ================= PAGINATION END =================
}
