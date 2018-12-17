# Nalej

Nalej UI

## Overall features   
Brand new UI Frontend for Nalej. 

- Sidebar with navigation
    - Edit profile
    - Organization
    - Resources
    - Applications
    - Logout

- Organizations view
    - Top indicators with organization info
    - Members user list with action buttons
    - Subscription plan

- Resources view
    - Top indicators 
        - Summary info
        - Clusters info [carousel](https://valor-software.com/ngx-bootstrap/#/carousel) with cluster [pie charts](https://swimlane.gitbook.io/ngx-charts/examples/pie-charts/pie-chart) 
        - Nodes status [timeline chart](https://swimlane.gitbook.io/ngx-charts/examples/line-area-charts/line-chart)
    - Clusters linst info with action buttons

- Clusters view
    - Top indicators 
        - Cluster status info  
        - Summary info
    - Breadcrumbs
    - Nodes list  

- Appications view
    - Top indicators
        - Summary info
        - App status timeline
    - Deploy new app form view
    - Deployed app instances list with info button
        - App info graph based on [Ngx-graph](https://github.com/swimlane/ngx-graph)
        - App info list
    
To see older logs check `CHANGELOG.md` file

Tested and suported resolutions in pixels:
- 1280 x 720
- 1280 x 800
- 1366 x 768
- 1440 x 900 
- 1613 x 917
- 1613 x 1027
- 1680 x 1027
- 1920 x 1080
- 1920 x 1200
- 2560 x 1440
- 2560 x 1800


## Requirements

- Node Package Manager (NPM) https://www.npmjs.com/
- Angular Command Line (Angular-CLI) https://cli.angular.io/

## Installation

- `Clone the repository`
- `Change to project directory`
- `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Using `--prod` flag will produce a dependency injection error (generated conflict between two libraries: [ngx-bootstrap](https://github.com/valor-software/ngx-bootstrap) and [ngx-graph](https://github.com/swimlane/ngx-graph)).

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Documentation

Compodoc is the integrated library that automates the documentation generation. To update the documentation just run `npm run compodoc` and the updated version will be available to serve it in `documentation` folder ([http-server](https://www.npmjs.com/package/http-server) could be used for this purpose).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
