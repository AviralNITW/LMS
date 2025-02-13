    // Function to handle login
     // Function to handle login
     function handleLogin(event) {
        event.preventDefault();
  
        const mobile = document.getElementById('loginMobile').value;
        const password = document.getElementById('loginPassword').value;
        const errorMessage = document.getElementById('errorMessage');
  
        // Retrieve stored user data from local storage
        const storedUserData = localStorage.getItem(mobile);
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
  
          // Check if entered credentials match the stored ones
          if (userData.password === password) {
            displayProfile(userData);
            errorMessage.textContent = '';
          } else {
            errorMessage.textContent = 'Invalid Mobile Number or Password.';
          }
        } else {
          errorMessage.textContent = 'Invalid Mobile Number or Password.';
        }
      }
  
      // Function to handle sign-up
      function handleSignUp(event) {
        event.preventDefault();
  
        const name = document.getElementById('signupName').value;
        const mobile = document.getElementById('signupMobile').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const profilePictureInput = document.getElementById('profilePictureInput');
        const signupMessage = document.getElementById('signupMessage');
  
        // Check if passwords match
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return false;
        }
  
        // Check if a profile picture is selected
        if (profilePictureInput.files.length === 0) {
          alert('Please select a profile picture.');
          return false;
        }
  
        // Read the profile picture file as Base64
        const reader = new FileReader();
        reader.onload = function () {
          const profilePictureBase64 = reader.result;
  
          // Store user data in local storage
          const userData = {
            name: name,
            mobile: mobile,
            password: password,
            profilePicture: profilePictureBase64
          };
  
          // Save the data with the mobile number as the key
          localStorage.setItem(mobile, JSON.stringify(userData));
  
          // Display success message
          signupMessage.textContent = 'Account created successfully!';
          alert('Sign-Up Successful! You can now log in.');
  
          // Clear the form
          document.getElementById('signupName').value = '';
          document.getElementById('signupMobile').value = '';
          document.getElementById('signupPassword').value = '';
          document.getElementById('signupConfirmPassword').value = '';
          document.getElementById('profilePictureInput').value = '';
  
          // Switch back to Login form after sign-up
          setTimeout(switchToLoginForm, 2000);
          return true;
        };
  
        // Read the image file
        reader.readAsDataURL(profilePictureInput.files[0]);
      }
  
      // Function to display profile picture and name after login
      function displayProfile(userData) {
        document.getElementById('loginForm').classList.remove('active');
        document.getElementById('profilePictureContainer').classList.remove('hidden');
        document.getElementById('profilePicture').src = userData.profilePicture;
        document.getElementById('profileName').textContent = userData.name;
      }
  
      // Function to switch to the Sign-Up form
      function switchToSignUpForm() {
        document.getElementById('loginForm').classList.remove('active');
        document.getElementById('signupForm').classList.add('active');
      }
  
      // Function to switch back to the Login form
      function switchToLoginForm() {
        document.getElementById('signupForm').classList.remove('active');
        document.getElementById('loginForm').classList.add('active');
      }
  
      // Initialize by showing the Login form
      document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('loginForm').classList.add('active');
      });




      // Check if user is logged in
      document.addEventListener('DOMContentLoaded', function () {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (isLoggedIn !== 'true') {
            // User not logged in - show locked courses
            renderLockedCourses();
        } else {
            // User logged in - show accessible courses
            renderCourses();
        }
    });

    // Function to render locked courses
    function renderLockedCourses() {
        const courseContainer = document.getElementById('courseContainer');
        const lockedMessage = `<div class="lock-overlay">You need to log in to access courses.</div>`;
        
        // Dummy course data
        const courses = [
            { title: "Web Development", description: "Learn how to build websites with HTML, CSS, and JavaScript." },
            { title: "Data Science", description: "Data science is an interdisciplinary field using scientific methods." },
            { title: "Graphic Design", description: "Create visual content to communicate messages." }
        ];

        // Display courses as locked
        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course locked';
            courseElement.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="#">Start Course</a>
                ${lockedMessage}
            `;
            courseContainer.appendChild(courseElement);
        });
    }

    // Function to render accessible courses
    function renderCourses() {
        const courseContainer = document.getElementById('courseContainer');
        
        // Dummy course data
        const courses = [
            { title: "Web Development", description: "Learn how to build websites with HTML, CSS, and JavaScript.", link: "webdev.html" },
            { title: "Data Science", description: "Data science is an interdisciplinary field using scientific methods.", link: "DataScience.html" },
            { title: "Graphic Design", description: "Create visual content to communicate messages.", link: "Graphicdesign.html" },
            { title: "C++", description: "High-performance programming language.", link: "c++.html" },
            { title: "Python", description: "Versatile, high-level programming language.", link: "python.html" },
            { title: "DBMS", description: "Database Management System (DBMS) overview.", link: "dbms.html" }
        ];

        // Display unlocked courses
        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course';
            courseElement.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="${course.link}">Start Course</a>
            `;
            courseContainer.appendChild(courseElement);
        });
    }

    // Function to handle user logout
    function logout() {
        localStorage.removeItem('isLoggedIn');
        alert('You have been logged out.');
        window.location.href = 'login.html'; // Redirect to login page
    }