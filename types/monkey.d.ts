declare namespace Monkey {
  interface Metadata {
    /**
     * The name of the script, shown in script list and menus. It must be unique within a {@link namespace}.
     * If a script is being installed, and a script with the same {@link namespace} and {@link name} already exists, it will be replaced by the new one.
     * Creating a script with same {@link namespace} and {@link name} will cause a conflict error.
     */
    name: string
    'name:zh-CN': string // TODO Add your language
    /**
     * A brief summary to describe the script.
     */
    description: string
    'description:zh-CN': string // TODO Add your language
    /**
     * Version of the script, it can be used to check if a script has new versions.
     * It is composed of several parts, joined by .. Each part must start with numbers, and can be followed by alphabetic characters.
     */
    version: string
    /**
     * @default ''
     * The combination of <b>@namespace</b> and <b>@name</b> is the unique identifier for a userscript.
     * <b>@namespace</b> can be any string, for example the homepage of a group of userscripts by the same author.
     * If not provided the <b>@namespace</b> falls back to an empty string ('').
     */
    namespace: string
    /**
     * Define rules to decide whether a script should be executed.
     * It is recommended to use {@link match} instead of <b>@include</b>.
     */
    match: string[]
    'exclude-match': string[]
    /**
     * Specify an icon for the script.
     */
    icon: string
    /**
     * Require another script to execute before the current one.
     * The value is the URL to the required script, which may be relative to the URL the script is being installed from.
     * The required script will be downloaded along with installation and execute before the script.
     * Local files are not allowed to be required due to security concern.
     * Also it does not make sense since scripts are supposed to work on different devices.
     */
    require: string[]
    /**
     * Some static resources that can be accessed in the script by GM_getResourceText and GM_getResourceURL.
     * The value is composed of two parts, joined with one or more white spaces.
     * The first part is the name of the resource, no white space is allowed in it.
     * The second part is the URL to the resource, which may be relative to the URL the script is being installed from.
     * The resource will be downloaded along with installation and can be accessed when the script executes.
     */
    resource: string[]
    /**
     * Decide when the script will execute.
     *
     * @default <b>document-end</b>
     * <b>document-end</b>
     * The script executes when DOMContentLoaded is fired.
     * At this time, the basic HTML of the page is ready and other resources like images might still be on the way.
     *
     * <b>document-start</b>
     * The script executes as soon as possible.
     * There is no guarantee for the script to execute before other scripts in the page.
     *
     * <b>document-idle</b>
     * The script executes after DOMContentLoaded is fired.
     */
    'run-at': 'document-end' | 'document-start' | 'document-idle'
    /**
     * When present, the script will execute only in top level document, but not in nested frames.
     */
    noframes: boolean
    /**
     * Specify which special APIs should be granted and can be used when the script executes.
     * If no {@link grant} is present, {@link grant} none is assumed.
     */
    grant: (
      | 'GM_*'
      | 'GM_info'
      | 'GM_getValue'
      | 'GM_setValue'
      | 'GM_deleteValue'
      | 'GM_listValues'
      | 'GM_addValueChangeListener'
      | 'GM_removeValueChangeListener'
      | 'GM_getResourceText'
      | 'GM_getResourceURL'
      | 'GM_addStyle'
      | 'GM_openInTab'
      | 'GM_registerMenuCommand'
      | 'GM_unregisterMenuCommand'
      | 'GM_notification'
      | 'GM_setClipboard'
      | 'GM_xmlhttpRequest'
      | 'GM_download'
    )[]
    /**
     * Decide which context the script will be injected into.
     * If not set in the metadata block, the default value page will be used. However, you can change the default value in Violentmonkey settings.
     *
     * @default <b>page</b>
     * <b>page</b>
     * Inject into context of the web page.
     * In this mode, unsafeWindow refers to the window object, allowing the script to access JavaScript objects of the web page, just like normal page scripts can.
     *
     * <b>content</b>
     * Inject into context of content scripts.
     * In this mode, unsafeWindow refers to the global object in content script. As a result, the script can access and modify the page's DOM, but cannot access JavaScript objects of the web page.
     *
     * <b>auto</b>
     * Try to inject into context of the web page. If blocked by CSP rules, inject as a content script.
     */
    'inject-into': 'page' | 'content' | 'auto'
    /**
     * The URL the script can be downloaded from.
     * Checked for updates automatically at a regular interval, and also manually on user request.
     * Automatically added when using "Install from URL."
     */
    downloadURL: string
    /**
     * If supplied, the question mark icon in the user scripts list will link to this.
     */
    supportURL: string
    /**
     * If supplied, the home icon in the user scripts list will link to this.
     */
    homepageURL: string
  }

  type ValueChangeListener = (name: string, oldValue: any, newValue: any, remote: boolean) => void

  // Response

  enum ReadyState {
    Unsent = 0,
    Opened = 1,
    HeadersReceived = 2,
    Loading = 3,
    Done = 4
  }

  interface ResponseBase {
    readonly responseHeaders: string
    readonly readyState: ReadyState
    readonly response: any
    readonly responseText: string
    readonly responseXML: Document | null
    readonly status: number
    readonly statusText: string
  }

  interface ProgressResponseBase {
    done: number
    lengthComputable: boolean
    loaded: number
    position: number
    total: number
    totalSize: number
  }

  interface ErrorResponse extends ResponseBase {
    readonly error: string
  }

  interface Response<TContext> extends ResponseBase {
    readonly finalUrl: string
    readonly context: TContext
  }

  interface ProgressResponse<TContext> extends Response<TContext>, ProgressResponseBase {}

  // Request

  interface RequestHeaders {
    readonly [header: string]: string
  }

  type RequestEventListener<TResponse> = (this: TResponse, response: TResponse) => void

  interface Request<TContext = object> {
    method?: 'GET' | 'HEAD' | 'POST'
    /** Destination URL */
    url: string
    /**
     * i.e. user-agent, referer... (some special headers are not supported
     * by Safari and Android browsers)
     */
    headers?: RequestHeaders
    /** String to send via a POST request */
    data?: string
    /** Send the data string in binary mode */
    binary?: boolean
    /** Timeout in ms */
    timeout?: number
    /** Property which will be added to the response object */
    context?: TContext
    responseType?: 'arraybuffer' | 'blob' | 'json'
    /** MIME type for the request */
    overrideMimeType?: string
    /** Don't send cookies with the requests (please see the fetch notes) */
    anonymous?: boolean
    /**
     * (Beta) Use a fetch instead of a xhr request(at Chrome this causes
     * `xhr.abort`, `details.timeout` and `xhr.onprogress` to not work and
     * makes `xhr.onreadystatechange` receive only readyState 4 events)
     */
    fetch?: boolean
    /** Username for authentication */
    username?: string
    password?: string

    // Events

    /** Callback to be executed if the request was aborted */
    onabort?(): void

    /** Callback to be executed if the request ended up with an error */
    onerror?: RequestEventListener<ErrorResponse>
    /** Callback to be executed if the request started to load */
    onloadstart?: RequestEventListener<Response<TContext>>
    /** Callback to be executed if the request made some progress */
    onprogress?: RequestEventListener<ProgressResponse<TContext>>
    /** Callback to be executed if the request's ready state changed */
    onreadystatechange?: RequestEventListener<Response<TContext>>

    /** Callback to be executed if the request failed due to a timeout */
    ontimeout?(): void

    /** Callback to be executed if the request was loaded */
    onload?: RequestEventListener<Response<TContext>>
  }

  // Download Response

  interface DownloadProgressResponse extends ProgressResponseBase {
    readonly finalUrl: string
  }

  interface DownloadErrorResponse {
    /**
     * Error reason
     * - `not_enabled` - the download feature isn't enabled by the user
     * - `not_whitelisted` - the requested file extension is not
     * whitelisted
     * - `not_permitted` - the user enabled the download feature, but did
     * not give the downloads permission
     * - `not_supported` - the download feature isn't supported by the
     * browser/version
     * - `not_succeeded` - the download wasn't started or failed, the
     * details attribute may provide more information
     */
    error: 'not_enabled' | 'not_whitelisted' | 'not_permitted' | 'not_supported' | 'not_succeeded'
    /** Detail about that error */
    details?: string
  }

  // Download Request

  interface DownloadRequest {
    /** URL from where the data should be downloaded */
    url: string
    /**
     * Filename - for security reasons the file extension needs to be
     * whitelisted at Tampermonkey options page
     */
    name: string
    headers?: RequestHeaders
    /** Show 'Save As' dialog */
    saveAs?: boolean
    timeout?: number
    /** Callback to be executed if this download ended up with an error */
    onerror?: RequestEventListener<DownloadErrorResponse>

    /** Callback to be executed if this download finished */
    ontimeout?(): void

    /** Callback to be executed if this download finished */
    onload?(): void

    /** Callback to be executed if this download failed due to a timeout */
    onprogress?: RequestEventListener<DownloadProgressResponse>
  }

  interface AbortHandle<TReturn> {
    abort(): TReturn
  }

  interface OpenTabOptions {
    /** Decides whether the new tab should be focused */
    active?: boolean
    /** Inserts the new tab after the current one */
    insert?: boolean
    /** Makes the browser re-focus the current tab on close */
    setParent?: boolean
  }

  interface OpenTabObject {
    /** Closes tab */
    close(): void

    /** Set closed listener */
    onclosed?(): void

    closed: boolean
  }

  interface NotificationThis extends Notification {
    id: string
  }

  type NotificationOnClick = (this: NotificationThis) => void
  /** `clicked` is `true` when `text` was set */
  type NotificationOnDone = (this: NotificationThis, clicked: boolean) => void

  interface Notification {
    /** Text of the notification (optional if highlight is set) */
    text?: string
    /** Notification title. If not specified the script name is used */
    title?: string
    image?: string
    /** Flag whether to highlight the tab that sends the notification */
    highlight?: boolean
    /** Time after that the notification will be hidden. `0` = disabled */
    timeout?: number
    /**
     * Called when the notification is closed (no matter if this was
     * triggered by a timeout or a click) or the tab was highlighted
     */
    onclick?: NotificationOnClick
    /** Called in case the user clicks the notification */
    ondone?: NotificationOnDone
  }

  interface TextNotification extends Notification {
    /** Text of the notification (optional if highlight is set) */
    text: string
  }

  interface HighlightNotification extends Notification {
    text?: undefined
    highlight: true
  }

  type NotificationDetails = TextNotification | HighlightNotification
}

/**
 * The unsafeWindow object provides full access to the pages javascript
 * functions and variables
 */
declare const unsafeWindow: Window

// Styles

/**
 * Adds the given style to the document and returns the injected style element.
 */
declare function GM_addStyle(css: string): HTMLStyleElement

// Storage

/** Sets the value of `name` to the storage */
declare function GM_setValue(name: string, value: any): void

/**
 * Adds a change listener to the storage and returns the listener ID.
 * The `remote` argument of the callback function shows whether this value was
 * modified from the instance of another tab (`true`) or within this script
 * instance (`false`). Therefore this functionality can be used by scripts of
 * different browser tabs to communicate with each other.
 * @param name Name of the observed variable
 * @param listener
 */
declare function GM_addValueChangeListener(name: string, listener: Monkey.ValueChangeListener): number

/** Removes a change listener by its ID */
declare function GM_removeValueChangeListener(listenerId: number): void

/** Gets the value of 'name' from storage */
declare function GM_getValue<TValue>(name: string, defaultValue?: TValue): TValue

/** Deletes 'name' from storage */
declare function GM_deleteValue(name: string): void

/** Lists all names of the storage */
declare function GM_listValues(): string[]

// Resources

/** Get the content of a predefined `@resource` tag at the script header */
declare function GM_getResourceText(name: string): string

/**
 * Get the base64 encoded URI of a predefined `@resource` tag at the script
 * header
 */
declare function GM_getResourceURL(name: string): string

// Menu commands

/**
 * Register a menu to be displayed at the Tampermonkey menu at pages where this
 * script runs and returns a menu command ID.
 */
declare function GM_registerMenuCommand(name: string, onClick: () => void, accessKey?: string): number

/**
 *  Unregister a menu command that was previously registered by
 * `GM_registerMenuCommand` with the given menu command ID.
 */
declare function GM_unregisterMenuCommand(menuCommandId: number): void

// Requests

/** Makes an xmlHttpRequest */
declare function GM_xmlhttpRequest<TContext = any>(
  details: Monkey.Request<TContext> // tslint:disable-line:no-unnecessary-generics
): Monkey.AbortHandle<void>

/** Downloads a given URL to the local disk */
declare function GM_download(details: Monkey.DownloadRequest): Monkey.AbortHandle<boolean>

declare function GM_download(url: string, name: string): Monkey.AbortHandle<boolean>

// Tabs

/** Saves the tab object to reopen it after a page unload */
declare function GM_saveTab(obj: object): void

/** Gets a object that is persistent as long as this tab is open */
declare function GM_getTab(callback: (obj: any) => void): void

/** Gets all tab objects as a hash to communicate with other script instances */
declare function GM_getTabs(callback: (tabsMap: { [tabId: number]: any }) => void): void

// Utils

/** Log a message to the console */
declare function GM_log(...message: any[]): void

/**
 * Opens a new tab with this url.
 * The options object can have the following properties:
 * - `active` decides whether the new tab should be focused,
 * - `insert` that inserts the new tab after the current one and
 * - `setParent` makes the browser re-focus the current tab on close.
 *
 * Otherwise the new tab is just appended.
 * If `options` is boolean (loadInBackground) it has the opposite meaning of
 * active and was added to achieve Greasemonkey 3.x compatibility.
 *
 * If neither active nor loadInBackground is given, then the tab will not be
 * focused.
 * @returns Object with the function `close`, the listener `onclosed` and a flag
 * called `closed`.
 */
declare function GM_openInTab(url: string, options?: Monkey.OpenTabOptions | boolean): Monkey.OpenTabObject

/**
 * Shows a HTML5 Desktop notification and/or highlight the current tab.
 * @param details
 * @param ondone If specified used instead of `details.ondone`
 */
declare function GM_notification(details: Monkey.NotificationDetails, ondone?: Monkey.NotificationOnDone): void

/**
 * Shows a HTML5 Desktop notification and/or highlight the current tab.
 * @param text Text of the notification
 * @param title Notification title. If not specified the script name is used
 * @param image
 * @param onclick Called in case the user clicks the notification
 */
declare function GM_notification(
  text: string,
  title?: string,
  image?: string,
  onclick?: Monkey.NotificationOnClick
): void

/**
 * Copies data into the clipboard.
 * The parameter 'info' can be an object like
 * `{ type: 'text', mimetype: 'text/plain'}` or just a string expressing the
 * type ("text" or "html").
 */
declare function GM_setClipboard(data: string, info?: string | { type?: string; mimetype?: string }): void
