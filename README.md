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
* GeoApify
* Lealflet libraries


## 4. Complete setup/installion/usage
* Open with Live Server the index.html and click "Access GIGaNet"
* Create an account or login using your email address and password and you will be redirected to the main.html page

## 5. Known Bugs and Limitations
Here are some known bugs:
* Filter does not allow for both the key word search and the compensation function as the both require inequality filters. Firestore does not allow inequality * *     filters on multiple fields in the same query. 
* sometimes our map glitched due to api address.
* ...

## 6. Features for Future
What we'd like to build in the future:
* Messaging system so users can communicate within the application.
* Having money transaction through the website.
* implementing AI to help people during posting gigs and gig application
* having notification system when someone apply for the gig
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── main.html               # landing HTML file, this is what users see when you come to url
    /style.css               # style for all html pages
└── README.md               # details about the assignment

It has the following subfolders and files:
├── .gitignore               # ignores firebase api address so it would not get shared
├── images                   # Folder for images
    /background1.jpg         # main backgeound image
    /fooddonation.jpg         #carousel image
    /groupreview.jpg           #carousel image
    /help.jpg                 #carousel image
    /success.jpg               #carousel image
    /android-chrome.jpg            #fav icon
    /profilepic.jpg                # default profile pic
    /logo.jpg                     #logo image




├── scripts                  # Folder for scripts
    /application.js           # functionality to apply for the gig
    /authentication.js        # check the authentication.
    /confirmed.js             # gig confirmation page
    /filter.js                # folder to make the filter functional
    /firebaseAPI_BBY16.js     # api for firebase
    /gigapplicatns.js         # grab the data from firestore and show the owener who has applied
    /gigDescription.js        # folder for grabbing data from fire store and displaying in the gigDescription.html
    /main.js                  # garb the data from firestore and display it in main.html
    /mypost.js                # functionality to see the gigs user have posted
    /mypostfilter.js          # Filter the search results based on the user's selections
    /post.js                  # garb the data from the post.html and save it in firebase under giglisting
    /profile.js               # functionality to edit the profile
    /review.js                # grab the data from firebase and display the reviews in the review.html
    /reviewform.js            # grab the data from reviewform.html and store it in firebase
    /skeleton.js              # basic skeleton for every page


    


├── styles                   # Folder for styles
    /application.css         # style for application.html
    /filter.css              # style for 
    /gigapplicants.css       # style for gigapplicants.html
    / gigDescription.css     # style for gigDescription.html
    /index.css               # style for index.html
    /login.css               # style login.html
    /main.css                # style for main.html
    /mediaqueries.css        # style for confirmed.html, gigDescription.html, hiredDescription.html, main.html, mypost.html
    /post.css                # style for post.html
    /profile.css             # style for profile.html
    /review.css              # style for review.html
    /reviewform.css          # style for reviewform.html, reviewform2.html
    /thanks.css              # style for thanks.html



```

