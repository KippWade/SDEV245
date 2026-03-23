// RBAC Demo in Node.js
// Demonstrates Authentication vs Authorization + CIA Triad

const demoUsers = {
  admin: { password: "admin123", role: "admin" },
  user:  { password: "user123",  role: "user" }
};

// no current user to start with
let currentUser = null;

/**
 * Login demonstration
 */
function login(username, password) {
  const user = demoUsers[username];
  
  if (!user) {
    console.warn("User not found.");
    return false;
  }
  
  if (user.password !== password) {
    console.warn("Incorrect password.");
    return false;
  }
  
  currentUser = { username, role: user.role };
  console.log(`Welcome, ${username} (${user.role}), you are now logged in!`);
  return true;
}

/**
 * Authorization
 */
function checkRole(requiredRole) {
  if (!currentUser) {
    console.warn("Access denied, Please login first.");
    return false;
  }
  
  if (currentUser.role !== requiredRole) {
    console.warn(`Access denied: ${requiredRole}s role required.`);
    return false;
  }
  
  return true;
}

/**
 * Routes with role checks
 */

// Admin-only action
function viewAdminDashboard() {
  if (!checkRole("admin")) return;
  console.log("Admin Dashboard: Viewing all user data and system settings.");
}

// User-only action
function viewUserProfile() {
  if (!checkRole("user")) return;
  console.log(`User Profile: Showing profile for ${currentUser.username}`);
}

// Both roles can do this
function viewPublicInfo() {
  console.log("Public Information: This is available to all users, including guests.");
}


console.log("=== RBAC Demo Started ===\n");

// Attempt without login
viewAdminDashboard();
viewUserProfile();

// Login as user
login("user", "user123");
viewUserProfile();        // Allowed
viewPublicInfo();         // Allowed
viewAdminDashboard();     // Denied

console.log("\n--- Logging out and switching user ---\n");
currentUser = null;

// Login as admin
login("admin", "admin123");
viewAdminDashboard();     // Allowed
viewUserProfile();        // Denied (because admin is not "user" role)
viewPublicInfo();         // Allowed

console.log("\n=== Demo Finished ===");