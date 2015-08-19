# Room Key Front End Challenge

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
  - [Back End Structure](#back-end-structure)
  - [Front End Structure](#front-end-structure)
- [User Interface](#user-interface)
  - [Search UI](#search-ui)
      - [Search displayed on a desktop computer](#search-displayed-on-a-desktop-computer)
      - [Search displayed on a horizontal iPad](#search-displayed-on-a-horizontal-ipad)
      - [Search displayed on a vertical iPad](#search-displayed-on-a-vertical-ipad)
      - [Search displayed on a horizontal iPhone 6](#search-displayed-on-a-horizontal-iphone-6)
      - [Search displayed on a vertical iPhone 6](#search-displayed-on-a-vertical-iphone-6)
  - [Hotel Details](#hotel-details)
      - [Hotel details on desktop computer](#hotel-details-on-desktop-computer)
      - [Hotel details on horizontal iPad](#hotel-details-on-horizontal-ipad)
      - [Hotel details on vertical iPhone 6](#hotel-details-on-vertical-iphone-6)
- [Distribution Build](#distribution-build)
- [Code Documentation](#code-documentation)
- [To Do](#to-do)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Overview

This is my submission for the [Room Key Front End Development Challenge](https://github.com/roomkey/front-end-code-challenge). I ended up working closer to 32 hours than the suggested 8, but I really got into the project. I hope you will forgive the enthusiasm.

Here are the key things I wanted to show:

* Robust, functional interface
* Expanded hotel searching by distance rather than having hotels bound to a location
* Responsive design that's easy to use on any size device
* Localization and language switching

I am always looking to improve, so please don't hesitate to comment on any part of this project. Feedback is welcome and will be put to good use.

## Getting Started

1. Install [NodeJS](https://nodejs.org/) if you haven't already.

2. Clone this repository to your local machine, and navigate to it's root directory in your 
command line interface.

3. Install all required dependencies by running the following command:

        npm install    

4. Start the server by running the following command:

        npm start

5. Navigate to [http://localhost:9696/](http://localhost:9696/) in your browser.

## Project Structure

I chose to use a single page JavaScript application design rather than having users navigate between separate pages. There may be more initial loading, but the overall user experience should be smoother and more dynamic, with less drag on the back end system.

The user interface leverages [Backbone.js](http://backbonejs.org/) to manage a modular design pattern. Views render data to templates, and automatically
update as data is modified. Dependencies are managed using [npm](http://npmjs.com) and [browserify](http://browserify.org). 

Here is the directory structure for this project:

``` 
+---data
|   +---hotels
+---public
|   +---images
|   +---img
|   +---src
|       +---collections
|       +---models
|       +---styles
|       +---templates
|       +---views
+---routes
+---scripts
```

### Back End Structure

The back end provided for this coding challenge was written by Room Key staff in [NodeJS](http://nodejs.org/download/) with existing API methods that returned data from flat JSON files. I would use a full, relational database for a live version of this application to be able to perform more flexible
queries and take advantage of indexing. I imported [US ZipCode data](http://www.opengeocode.org/download.php#cityzip) and created a new [`data/zipcodes.json`](https://github.com/JeromeDane/front-end-code-challenge/blob/jeromedane/data/zipcodes.json) file to serve up more locations than the 
[original 3](https://github.com/roomkey/front-end-code-challenge/blob/master/data/locations.json) provided in the coding challenge.

I implement latitude/longitude based distance calculation in the back end based on [this formula](http://www.movable-type.co.uk/scripts/latlong.html) to be able to find all hotels within a dynamic distance of any given point. Doing so on data from a flat JSON is not optimal, and would not scale well to searching a very large set of hotels. This would likely require a database scheme that supports indexing, caching, or other optimization tricks like 
first mapping hotels to regions encompassing several adjacent cities and searching distance only on those hotels within a given region.

The back end server provides real-time bundling of all source files. Accessing `\index.js` in the browser causes the back end to run browserify to serve a bundled file containing all of the scripts. Accessing `\index.css` in the browser causes the back end to run less to generate and serve up a bundled file containing all of the stylesheets.

### Front End Structure

The user interface code is held within [`public`](https://github.com/JeromeDane/front-end-code-challenge/tree/jeromedane/public). The [`public/src`](https://github.com/JeromeDane/front-end-code-challenge/tree/jeromedane/public/src) directory contains the various collections, models, styles, templates, and views required to render the user interface. 

When loaded in a browser, [`public/index.html`](https://github.com/JeromeDane/front-end-code-challenge/blob/jeromedane/public/index.html) asks the back end for `\index.js` and `\index.css`, which will automatically be generated containing bundles of all necessary scripts and styles from [`public/src`](https://github.com/JeromeDane/front-end-code-challenge/tree/jeromedane/public/src).

Many of the interactive input elements are generated using [jQuery UI](https://jqueryui.com) to create a rich experience with less coding time and good cross-browser support.

## User Interface

I am more of a coder than a graphic designer, so I focused on functionality over aesthetics. I personally prefer the "Google aesthetic", featuring flat, simple UI elements that put content and usability first. I chose to emulate much of the existing [Room Key](http://roomkey.com) color scheme
and layout in order to see how it could be adapted to a responsive design.

The massive increase in use of phones, tablets, and other mobile devices means that users are viewing sites on a wide variety of screen sizes. The user interface for this project is designed to adapt to any size screen in order to provide an optimal user experience. This is an area in which I hope to be able to contribute.

[Chrome](https://www.google.com/chrome/) provides an excellent [device preview mode](https://developer.chrome.com/devtools/docs/device-mode), allowing you to easily re-render the interface as it would be displayed on a variety of mobile devices. 

### Search UI

The search interface is the primary point of interaction within the application. Users are prompted to enter a city or zipcode for their destination, as well as check-in/check-out dates and a maximum distance within which to find hotels. 

The interface will make a location search request to the back end API after a short delay from the most recent key-press. A small loading indicator in the right portion of the search input lets users know that data is being loading. Matching locations are displayed in a drop-down, and the desired location can then be selected by clicking/tapping or using the arrow keys on the keyboard and pressing enter. An error message is displayed if the user attempts to perform a search without first selecting a valid location.

The check-in and check-out fields are pre-populated with the current and following days for convenience. These can be changed by clicking/tapping on either date and selecting a new date from the pop-up calendars. The interface prevents users from selecting a check-out date before their check-in date, and vice-versa. The number of nights the user will stay is displayed next to the check-out field.

Filters are available to further limit and refine search results. Hotel preview cards are rendered in a [Pinterest](https://www.pinterest.com/) like, stacking layout using the [Masonry](http://masonry.desandro.com/) library. The hotel preview cards are automatically updated as filters are applied.

##### Search displayed on a desktop computer

The location search field is large, taking up the full width. The check-in, check-out, and maximum distance fields are displayed in three columns to save on vertical space. Filters are easily accessible on the left. 

![Search Interface on Desktop](https://lh3.googleusercontent.com/FHXjPUOuVepd1Lha-LVikiGCosvG56VlCsjJBq_9KTat=w1465-h976-no "Search Interface on Desktop")

##### Search displayed on a horizontal iPad

The interface automatically adjusts to fit the maximum number of hotel preview card columns. All user elements are touch responsive, and sliders can be moved with touch events thanks to the [touchpunch](http://touchpunch.furf.com/) library.

![Search Interface on Horizontal iPad](https://lh3.googleusercontent.com/LD9QH1FOjE7CFzS8LZQcZ7O27c-3VAWaR4eNQ7cWGZaU=w1008-h767-no "Search Interface on Horizontal iPad")

##### Search displayed on a vertical iPad

The check-in and check-out fields are displayed in two columns, while the maximum distance slider is displayed below, taking up the full width.

The filter box is moved from the left side of the screen to above the search results, and most of the fields are hidden to avoid taking up too much vertical space. Clicking on the "Filter Search Results" button will expand the search box so that all filters are accessible.

![Search Interface on Vertical iPad](https://lh3.googleusercontent.com/8g34eDEAapXvFmLZ0MAYNOvRA_5Szi4zZYZu08D1CeCk=w601-h813-no "Search Interface on Vertical iPad")

##### Search displayed on a horizontal iPhone 6

Similar to a vertical iPad, but the interface has resized to show two hotel preview card columns.

![Search Interface on horizontal iPhone 6](https://lh3.googleusercontent.com/zBPwFslA7hxLjaZyPhuEhVhMYW-JnJwNJJdbD-9Bfgbr=w660-h372-no "Search Interface on vertical horizontal6")

A small amount of scrolling down reveals two centered hotel preview card columns

![Search Interface on horizontal iPhone 6](https://lh3.googleusercontent.com/OzZTKN414rt4InsbCJn3Woy_Ftjoq2JMcXvRuEe60Lpq=w665-h373-no "Search Interface on horizontal iPhone 6 - scrolled down")

##### Search displayed on a vertical iPhone 6

The language selector in the top right is moved down so the site title does not wrap to multiple lines. The search and filter boxes automatically scale to fit.

![Search Interface on vertical iPhone 6](https://lh3.googleusercontent.com/St97F3mShv1mNbj1YjFIja17FMhpJaPoUqfq9dvZlmnw=w361-h658-no "Search Interface on vertical iPhone 6")

A small amount of scrolling reveals centered hotel preview cards.

![Search Interface on vertical iPhone 6](https://lh3.googleusercontent.com/xR7ZLTq_bH-5Wv05qv_gR_hqoKJfNKHBEkWWOS70qCoh=w360-h655-no "Search Interface on vertical iPhone 6 - scrolled down")

### Hotel Details

Clicking/tapping on a hotel preview card opens a modal dialog containing details about the selected hotel. This dialog animates up from the selected card to the center of the screen, creating a sense of physicality to the interaction. The dialog can be closed by clicking/tapping anywhere outside of the dialog box, by clicking/tapping on the "X" button in the top right, or by pressing the escape key on the keyboard.

There are four navigational tabs. The overview tab contains a horizontally scrolling preview of the photos available for the selected hotel. It can be moved right or left by clicking and dragging or through touch gestures thanks to the [Sly](http://darsa.in/sly/) library. Clicking/tapping on any photo will open a touch-enabled, full-screen view, allowing users to click or swipe to view the next photo thanks to the [Swipebox](http://brutaldesign.github.io/swipebox/) library.

The photos tab contains a grid of thumbnails of all available photos for the hotel. Selecting any of these will open the full screen photo view. The map tab features a larger, Google-powered map of the hotel's location. The reviews tab contains a breakdown of the frequency of guest ratings as well as a list of guest reviews.

##### Hotel details on desktop computer

The hotel name, address, stars, rating, and booking information are displayed across the top of the dialog box for easy access. The hotel description, amenities, and a small preview map are displayed in 3 columns.

![Hotel details on desktop](https://lh3.googleusercontent.com/DdStq67-BYUpVYlr2AoDBMByt35SqCvQSbuSgtHU-xnM=w1494-h889-no "Hotel details on desktop")

Guest rating frequencies are displayed to the left of guest reviews.

![Hotel details on desktop](https://lh3.googleusercontent.com/_QVSrhNn-YFFZ3nY9QMOMS1Tkj7X2qqL8I8SRdR4I9OC=w1482-h905-no "Hotel details on desktop")

##### Hotel details on horizontal iPad

The dialog box is centered, taking up most of the screen, but similar in layout to the desktop experience.

![Hotel details on horizontal iPad](https://lh3.googleusercontent.com/iHxLZQ1xWNlBIIwGZP8lH9757MQvNqfGXx4eM4m_B8pe=w989-h760-no "Hotel details on horizontal iPad")

##### Hotel details on vertical iPhone 6

The dialog box is resized to fit the screen, and the booking information is shown below ratings, address, and hotel name.

![Hotel details on vertical iPhone 6](https://lh3.googleusercontent.com/weIbKRuHCAzPrkp5cj8GYqLJLjewt7eYIGoU-SG88VAh=w370-h663-no "Hotel details on vertical iPhone 6")

A small amount of scrolling reveals amenities and map preview.

![Hotel details on vertical iPhone 6](https://lh3.googleusercontent.com/FtMRfdAUS0PqLJEcosE3AsUM36eScHdbSsH0wfm9lgzZ=w370-h660-no "Hotel details on vertical iPhone 6")

## Distribution Build


1. Navigate to the root folder of the project in your command line and minify the scripts and styles by running:

        npm run build

3. Modify `public/index.html` so that the script and style tags refer to the minified files as follows:

        ...
        <link rel="stylesheet" type="text/css" href="index.bundle.css">
        ...
        <script src="index.js"></script>
        ...

    becomes

        ...
        <link rel="stylesheet" type="text/css" href="index.min.css">
        ...
        <script src="index.min.js"></script>
        ...

    __Note__: A better, automated build process is planned in the [To Do](#to-do) section below.

## Code Documentation

Normally I would include full JSDoc style comments within all of my code to be able to generate documentation through something like [YUIDoc](http://yui.github.io/yuidoc/). As much as I would have liked to fully document everything in this project, doing so was beyond the scope this challenge given everything else I wanted to get done. I included comments where appropriate to make it clear what the code is doing, as well as provide the groundwork for document generation in the future. 

I've also started investigating the [jsdoc-to-markdown](https://www.npmjs.com/package/jsdoc-to-markdown) module, which does a great job of turning JSDoc style comments into markdown (`*.md`) files.

## To Do

* Create a [gulp](http://gulpjs.com/)/[grunt](http://gruntjs.com/) process to automate [distribution build steps](#distribution-build).

* Handle jQuery-ui and Swipebox module image paths without having to manually copy images to `public` to support defaults in their respective CSS files

* Various bugs fixes and small features designated within the source code by TODO tags

* Refactor styles in [`public/src/styles`](https://github.com/JeromeDane/front-end-code-challenge/tree/jeromedane/public/src) to take advantage of [less](http://lesscss.org/). These styles were originally written in flat CSS and have not been optimized yet.

* Allow clicking on stars to set _Hotel Stars_ and _Guest Rating_ filters rather than forcing users to use the sliders

* Implement a short list feature allowing users to add hotels by click on an icon while hovering over a hotel preview card

* Fill initial empty space below search box with popular hotels or deals

## License

To my knowledge, all code and libraries used in this project are distributed unter the MIT license. The modifications to the original [coding challenge](https://github.com/roomkey/front-end-code-challenge) that resulted in [this submission](https://github.com/JeromeDane/front-end-code-challenge/tree/jeromedane) are licensed under [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/us/). I just ask that you include a link back here in your code or documentation if you use any of my modifications in your own work.
