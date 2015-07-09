ZipCode Data: http://www.opengeocode.org/download.php#cityzip

Distance calculation between lat/long points:
http://www.movable-type.co.uk/scripts/latlong.html

TODO:

* Replace == with === everywhere for stronger type checking

Room Key Front End Development Challenge
========================================

This is my submission for the 
[Room Key Front End Development Challenge](https://github.com/roomkey/front-end-code-challenge).
I ended up working closer to 32 hours than the suggested 8, but I really got
into the project. I hope you will forgive the enthusiasm.

Here are the key things I wanted to show:

* Robust, functional interface
* Expanded hotel searching by distance rather than having hotels bound to a location
* Responsive design that's easy to use on any size device
* Localization and language switching

I am always looking to improve, so please don't hesitate to
comment on any part of this project. Feedback is welcome and will be put to good use.

Thanks for your consideration.

## Code Structure

I chose to use a single page JavaScript application design rather than having the user
navigate between separate pages. This means there may be more initial loading, but the
overall user experience should be smoother and more dynamic, with less drag on the 
back-end system.

The user interface leverages [Backbone.js](http://backbonejs.org/) to manage a
relatively modular design pattern. Views render data to templates, and automatically
update as data is modified. Dependencies are managed and loaded using 
[Require.JS](http://requirejs.org/).

Here is the directory structure for this project:

``` 
+---data
|   +---hotels
+---public
|   +---collections
|   +---images
|   +---lib
|   +---models
|   +---styles
|   +---templates
|   +---views
+---routes
+---scripts
```

The user interface code is held within 
[``public``](https://github.com/JeromeDane/front-end-code-challenge/tree/jeromedane/public/views), 
which I might have called ***ui*** instead if I were starting from scratch. I have not had the opportunity
to work with Node.js much, so I am unaware if that would break any 
strong conventions. All third party libraries are located in 
[``public/lib``](https://github.com/JeromeDane/front-end-code-challenge/tree/jeromedane/public/lib). The 
remaining folders contain the various collections, images, models, styles, templates, and views required
to render the user interface. I also made some modifications to the API calls. These scripts
can be found in [``routes``](https://github.com/JeromeDane/front-end-code-challenge/tree/jeromedane/routes).

I tried to keep each file simple and focused on the task at hand. For example, my primary stylesheet
was getting very large, so I broke it up into multiple files, all loaded with ``@import`` statements.
Each view (i.e. modular content on the screen) has its own JavaScript and template file. Data is 
represented as collections and models, each with their own respective JavaScript files. 

When loaded in a browser, the main [``public/index.html``](https://github.com/JeromeDane/front-end-code-challenge/blob/jeromedane/public/index.html)
file loads [``public/config.js``](https://github.com/JeromeDane/front-end-code-challenge/blob/jeromedane/public/config.js) 
in order to provide the configuration that require.js needs to manage dependencies. 
[``public/main.js``](https://github.com/JeromeDane/front-end-code-challenge/blob/jeromedane/public/main.js) is then loaded, 
which initializes the user interface view found in 
[``public/views/ui.js``](https://github.com/JeromeDane/front-end-code-challenge/blob/jeromedane/public/views/ui.js).
This user interface view then initializes all of the various sub-views required to create a full user interface.

I would have liked to use a responsive framework like 
[Twitter Bootstrap](http://twitter.github.io/bootstrap/) or 
[Foundation](http://foundation.zurb.com/), but I have not had the opportunity to 
use them recently. As much as I would have loved to dive in and
learn one, it was faster to get this coding challenge done with custom CSS and HTML 
templates. This is an area I hope to explore in the near future.

## Documentation

Normally I would include full JSDoc style comments within all of the code to be able to 
generate documentation through something like [YUIDoc](http://yui.github.io/yuidoc/).
For the purposes of this coding challenge, I tried to include comments where appropriate
to make it clear what the code is doing, as well as provide the groundwork for document
generation in the future. As much as I would have liked to fully document all of the
code, doing so was beyond the scope this challenge given everything else I wanted to 
get done.

## Back End

The back end provided for this coding challenge was written in [NodeJS](http://nodejs.org/download/)
with existing API methods that returned data from flat JSON files. Normally I would use a full, 
relational database for this kind of application in order to be able to perform more flexible
queries and take advantage of indexing.

In order to make searching a little more interesting, I imported 
[US ZipCode data](http://www.opengeocode.org/download.php#cityzip) and created a new ``data/zipcodes.json``
file to serve up more locations than the 
[original 3](https://github.com/roomkey/front-end-code-challenge/blob/master/data/locations.json)
 provided in the coding challenge.

I implement latitude/longitude based distance calculation in the back end in order to be able 
to find all hotels within a dynamic distance of any given point. Doing so on data from a flat 
JSON is not optimal, and would not scale well to searching a very large set of hotels. This would 
likely require a database scheme that supports indexing, caching, or other optimization tricks like 
first mapping hotels to regions encompassing several adjacent cities and searching distance only 
on those hotels within a given region.

## Look and Feel

I am more of a coder than a graphic designer, so I focused on functionality over aesthetics.
I personally prefer the "Google aesthetic", featuring flat, simple UI elements that put 
content and usability first. I chose to emulate much of the existing Room Key color scheme
and layout in order to see how if might be modified for a responsive interface.

## Responsive Design

I am passionate about usability. The massive increase in the use of phones, tablets, and
other mobile devices means that users are viewing sites on a wide range of screen sizes. The
user interface for this project is designed to adapt to any size screen in order to provide
the best possible user experience. 

### Search Interface

![Search Interface on Desktop](https://lh3.googleusercontent.com/FHXjPUOuVepd1Lha-LVikiGCosvG56VlCsjJBq_9KTat=w1465-h976-no "Search Interface on Desktop")


## Using the Application

This application requires [NodeJS](http://nodejs.org/download/) which you
will need to install if you have not already done so.

Once you have NodeJS installed, clone this Github repository or 
[download](https://github.com/JeromeDane/front-end-code-challenge/archive/jeromedane.zip) 
and unzip the code to your local machine. Next navigate to the root folder of this project 
in your command line. 

Install the package dependencies by running:

```
npm install
```

Once the dependencies are installed, start the application server:

```
npm start
```

Once the server is running, you can access the start page (public/index.html) at [http://localhost:9696](http://localhost:9696).


## Optimization

One of the down-sides of single-page JavaScript applications is that they often require
a lot of front-loading of files and assets before the user can interact with the interface.
This could be mitigated by performing more asynchronous loads as the user makes requests, 
or by combining files in order to reduce the number of initial HTTP requests.

This project is designed to have the user interface code run through the 
[require.js optimizer](http://requirejs.org/docs/optimization.html). There are 111 raw source code
and asset files in the user interface portion of the project, totaling 2 MB. Loading the user
interface in a browser requires **59 HTTP requests**. After performing the optimization build, 
the UI folder contains 71 files totaling only 777 KB. There are only **16 HTTP requests** performed.

To run the optimization, navigate to the ``public`` folder of this project on your machine in a
console window, and run:

```
node lib/require/r.js -o build.js
```

The ``r.js`` optimization library has been included for convenience, but can also be 
[globally installed](http://requirejs.org/docs/optimization.html#download) on your machine.

This will create a new distribution folder ``public/dist`` on your machine. To tell the application
to use this folder rather than the full source code, stop any running instances of Node.js, then
modify ``app.js`` as in 
[this commit](https://github.com/JeromeDane/front-end-code-challenge/commit/5b9449f0dc6393a54c4d8aeb5431ca39990ab088)
so that it now loads the user interface from ``public/dist`` rather than ``public``, and restart the server:


```
npm start
```

Once the server is running, you can access the start page (public/index.html) at [http://localhost:9696](http://localhost:9696).

## License

To my knowledge, all code and libraries used in this project are MIT licensed. The modifications 
to the original [coding challenge](https://github.com/roomkey/front-end-code-challenge)
that resulted in [this submission](https://github.com/JeromeDane/front-end-code-challenge/tree/jeromedane) 
are licensed under [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/us/). 
Basically I just ask that if you use any of my modifications in your own work that you provide a link
somewhere in your code or documentation pointing back here.
