The main file is called "hamburger.html" 

#### Tech stack:

* HTML
* CSS
* Javascript
* JointJS

We have used HTML,CSS and JS along with a JavaScript library called JointJS that allows developers to create and interact with diagrams and visualizations in web applications. We identified this library among a few other JavaScript libraries (MxGraph, facbricJS etc) because it fit the requirements of this project perfectly. 

    1. Interactivity: Users can interact with the diagrams by dragging and dropping shapes,
       resizing them, and connecting them with links.

    2. Plugin support: JointJS supports a wide range of plugins that can add additional functionality
       to the library, such as exporting diagrams to different file formats.

    3. Extensibility: JointJS can be extended with custom code to add new features and functionality,
       such as custom shapes or interactions.

    4. Real-time collaboration: JointJS supports real-time collaboration, allowing multiple users to edit and view the same diagram simultaneously.
    
    5. High performance: JointJS is designed to be highly performant, even with large and complex diagrams.
    
    6. Styling: JointJS allows developers to customize the styling of shapes and links, including colors, fonts, and border styles


#### File Structure:
hamburger.html and hamburger.js are the final products.


#### How to Contribute to this project?
Once you decide which Issue you want to tackle from the issues tab, fork the issue-branch repository and start working on it. I have detailed below how I go about adding new features to the project. 
1. If the new feature is related to creating a new element that is to be added to the graph, then first create and test it by adding to newEle.html (it has a script tag within). Once you are satisfied, make sure to open a pull request and we will take care of integrating that element into mainDemo.html
2. If the new feature is an enchancement then integrate it into elementLabel.html & elementLabel.js. I have rendered a simple square with the right tools and a label attached to the element already. Test your feature out here.
3. If we ask you to merge the issue with the main demo then first try out your chagnes on twopaper.html only if everything works, then go ahead and make the same changes to mainDemo.html
4. If we are asking for a UI enchancement then make changes to twopaper.html before making the same ones to mainDemo.html in the main folder.
