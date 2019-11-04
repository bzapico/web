# Changelog

## v0.4.0

Overall:

- Corporative font and pallet
- Customized [graph](https://swimlane.github.io/ngx-graph/) adding silhouettes and icons to create a visual impact.
- Implementation and use of new classes, enums and interfaces.
- Added mechanisms to reuse code like services, presentation components and inheritance.
- Added tslint and stylelint to our usual workflow.
- Added [NGX-Translate](http://www.ngx-translate.com/) in every literal in the templates.
- New environment in local to get easy different tests like serve prod in local with a concrete configuration without modify another configurations usually static.
- Started to use HttpClient like dependency to avoid use deprecated dependencies.
- General cleaning in typescript files, SCSS files and HTML files, in this way we have smaller files.
- More restrictive .gitignore file, also it has deleted unnecessary directories like .vscode/*

- Resources view
  - Left indicators
    - Summary info card: amount of running clusters and instances
    - List card:
      - list of clusters and amount of instances running in each cluster
      - Labels
      - Edit cluster button
  - Right indicators
    - Clusters-instances relations graph

- Devices view
  - Added the [accordion](https://valor-software.com/ngx-bootstrap/#/accordion) component to divide the devices group with options button

- Applications view
  - Left indicators
    - Summary info card: amount of registered apps and running instances
    - List card divided in two tabs, instances and registered:
      - list of registered or instances
      - Labels
      - Status
      - Actions button (more info, undeploy, deploy or delete)
  - Right indicators
    - Clusters-instances relations graph
      - Added arrow to show the connections between apps
      - Quick filter options
      - Search in graph
      - Advanced filter options dialog
    - Register instance button
      - Open the register application dialog to drop a descriptor on it
    - Deploy instance button
      - Open the deploy instance dialog
      - Stepper component to difference between:
        - Simple instances
        - Instances with parameters
        - Instances with connections
    - Manage connections button
      - Open the manage connections dialog
      - List of available connections
      - Filter options
      - Searcher
      - Add new connection dialog
        - Target and sources dropdown for new connections creation

- Instances and registered view
  - Left indicators
    - Instance/Registered info card
      - Info detailed button
      - Parameters, networks and setup tabs
      - Labels card
      - Button actions card (Add connections, undeploy, deploy and delete)
  - Right indicators
    - Services graph
    - Services info tables
      - Groups table
        - Services group info button
        - Service info button
      - Access rules tables
        - Rule info button

## v0.3.0

Overall:

- HTML and CSS code optimization
- Unified media queries breakpoints
- Cards refactor for elasticity
- Creation of flexible tables
- Optimize [graph](https://swimlane.github.io/ngx-graph/), pie and line charts
- Sidebar and main info optimization
- Modified icons to ease understanding

- Infrastructure view
  - Vertical aggregated capabilities summary
  - Improved search box with results count
  - Static quick filters by inventory item type
  - Inventory list with specific type actions menu
    - ECs/Asset/Device modal windows navigation
    - Install agent form
    - Create agent token modal view
    - Unlink EC capabilities
    - Last operation logs modal view for assets
    - Uninstall agent from asset capability
    - Toggle enablement capability for devices
    - Unlink devices capability

## v0.2.0

Overall:

- Added sorting and filtering capabilities
- Label management in tables
- Forms refactor

- IoT Devices view
  - Top indicators
    - Summary info
    - Devices status timeline
  - Devices list
    - Tabs functionality
  - Add group modal view
  - Configuration group modal view
  - Device group created modal view
- Applications view
  - App instances tab divider
    - Deploy instance modal view
    - App instance extended view
    - Service instance extended info modal view
    - Rule extended info modal view
  - Registered instances tab divider
    - Register application modal view
    - App registered extended view
    - Service extended info modal view
    - Rule extended info modal view

## v0.1.0

Created the brand new UI Frontend for Nalej

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
  - Clusters list info with action buttons

- Clusters view

  - Top indicators
    - Cluster status info
    - Summary info
  - Breadcrumbs
  - Nodes list

- Applications view
  - Top indicators
    - Summary info
    - App status timeline
  - Deploy new app form view
  - Deployed app instances list with info button
    - App info graph based on [Ngx-graph](https://github.com/swimlane/ngx-graph)
    - App info list
