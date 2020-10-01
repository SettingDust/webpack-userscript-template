declare interface MetadataBlock {
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
    grant: Array<'GM_*'
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
        | 'GM_download'>

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
