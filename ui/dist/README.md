# ui-static-content
Static content for the DMTC user interface

This repository contains the JSON content and pointer files and referenced static content
for insertion into the Data Management Training Clearinghouse user interface. The content
model is based upon custom JSON wrappers that include content metadata and pointers to
related Markdown files representing the content itself. It also provides the static 
source imagery referenced by the user interface. 

This content is included as a submodule of the Clearinghouse's user interface respository: https://github.com/imls-dmt/userinterface, located in the `/ui/public` directory of the parent repository. When the user interface is built (using the `npm run build` command) the contents of the `public` directory are copied into the `ui/dist` directory for direct access as static content. 
