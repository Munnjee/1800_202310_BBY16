# Project Title
GIGaNet

## 1. Project Description
Due to the lack of available resources to find assistance during extreme weather events, we are developing a community networking application to help connect people seeking assistance with those in the community willing to fulfill that task. Users are able to post "gigs" that they need assistance with and people in the community can apply to the "gig" listings. 

## 2. Names of Contributors
List team members and/or short bio's here... 
* Min Ji S
* Parin R
* EKjot K

## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Google Font API
* Leaflet 1.9.3 APIT
* GeoApify
* All photos designed by Freepik

## 4. Complete setup/installion/usage
* Open with Live Server the index.html and click "Access GIGaNet" or alternatively visit our live link https://giganet-46ce5.web.app/index.html
* Set media window size to mobile size (ex. iphone 12) for optimal view of design
* Create an account or login using your email address and password and you will be redirected to the main.html page

## 5. Known Bugs and Limitations
Here are some known bugs:
* Filter does not allow for both the key word search and the compensation function as the both require inequality filters. Firestore
does not allow inequality filters on multiple fields in the same query. 
* Leaflet API is having connection issues where the CSS and JS are not loading (Displays error on console). Manual import created to bypass error.

## 6. Features for Future
What we'd like to build in the future:
* Messaging system so users can communicate within the application.
* Having money transaction through the website.
* Having a push notification setting to notify users when they are hired for a gig or if there is a new applicant for my gig post.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── index.html               # Landing page
├── login.html               # Login page
├── 404.html 
├── .gitignore               # Git ignore file 
├── .firebaserc
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── package-lock.json
├── package.json
├── storage.rules
└── README.md


It has the following subfolders and files:
├── .firebase
    /hosting..cache
├── html                    # Folder for HTML pages
    /aboutUs.html               # About us page
    /application.html           # Gig application page
    /confirmed.html             # Displays gigs that user is hired for
    /gigapplicants.html         # Displays people who have applied for user's gig post
    /gigDescription.html        # Displays details of gig post
    /hiredDescription.html      # Displays details of gig user is hired for
    /legal.html                 # Legal page
    /main.html                  # Main page with list of active gigs
    /mypost.html                # Displays user's gig posts
    /post.html                  # Form page to post a new gig
    /profile.html               # Profile setting page      
    /review.html                # Displays reviews about user and reviews user has completed
    /reviewform.html            # Review form for employees
    /reviewform2.html           # Review form for employer
    /thanks.html
├── images                   # Folder for images
    ├──background               # Subfolder for background images
        /background.jpg             # Designed by Freepik   
        /background1.jpg            # Designed by Freepik
    ├──carousel              # Subfolder for background images
        /fooddonation.jpg           # Designed by Freepik
        /groupreview.jpg            # Designed by Freepik 
        /help.jpg                   # Designed by Freepik
    ├──favicon_io            # Subfolder for favicon images
        /android-chrome-192x192.png
        /android-chrome-512x512.png
        /apple-touch-icon.png
        /favicon-16x16.png
        /favicon-32x32.png
        /favicon.ico
        /site.webmanifest
    ├──logo
        /logo.png
        /whitelogo.png
    profilepic.png           # Designed by Freepik           

├── scripts                  # Folder for scripts
    /application.js             # Gig application
    /authentication.js          # User login function
    /confirmed.js               # Function to display gig listings that users are hired for
    /filter.js                  # Filter function
    /firebaseAPI_BBY16.js       # API for Firebase
    /gigapplicants.js           # Function to display gig applicants
    /gigDescription.js          # Function to display gig details
    /leaflet.js                 # JS for map API
    /main.js                    # Displays gig cards and filter bar
    /mypost.js                  # Displays posts by user
    /post.js                    # Creates gig post to firestore
    /profile.js                 # Function to update profile settings
    /review.js                  # Reads the data from firebase and display the reviews in the review.html
    /reviewform.js              # Creates review to firestore
    /skeleton.js                # Loads navbar and logout function

├── styles                   # Folder for styles
    /application.css            # style for application.html
    /filter.css                 # style for filter bar
    /gigapplicants.css          # style for gigapplicants.html
    / gigDescription.css        # style for gigDescription.html
    /index.css                  # style for index.html
    /information.css            # style for aboutUs.html and legal.html
    /leaflet.css                # CSS for Leaflet Map API
    /login.css                  # style login.html
    /main.css                   # style for main.html
    /mediaqueries.css           # style for media query sizes
    /post.css                   # style for post.html
    /profile.css                # style for profile.html
    /review.css                 # style for review.html
    /reviewform.css             # style for reviewform.html, reviewform2.html
    /thanks.css                 # style for thanks.html