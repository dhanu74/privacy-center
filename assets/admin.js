(() => {
  const API = "https://privacy-center-api.dhananjayru74.workers.dev";
  const status = document.getElementById("status");
  const loginArea = document.getElementById("loginArea");
  const accountArea = document.getElementById("accountArea");
  const accountName = document.getElementById("accountName");
  const KEY = "privacy_center_session";

  function showLogin(message, error=false) {
    status.textContent=message; status.className=error?"status error":"status";
    loginArea.classList.remove("hidden"); accountArea.classList.add("hidden");
  }
  function showAccount(user) {
    status.textContent="GitHub authentication successful."; status.className="status good";
    accountName.textContent="Signed in as "+user.login+(user.name?" ("+user.name+")":"");
    loginArea.classList.add("hidden"); accountArea.classList.remove("hidden");
  }
  async function checkSession() {
    const hash=new URLSearchParams(location.hash.slice(1));
    const incoming=hash.get("session");
    if(incoming){sessionStorage.setItem(KEY,incoming);history.replaceState(null,"",location.pathname+location.search);}
    const result=new URLSearchParams(location.search).get("login");
    if(result==="unauthorized"){showLogin("This GitHub account is not authorized.",true);return;}
    if(result==="failed"){showLogin("GitHub sign-in failed. Please try again.",true);return;}
    const token=sessionStorage.getItem(KEY);
    if(!token){showLogin("You are not signed in. Continue with your authorized GitHub account.");return;}
    try{
      const response=await fetch(API+"/api/me",{headers:{"Authorization":"Bearer "+token},cache:"no-store"});
      const data=await response.json();
      if(!response.ok||!data.authenticated){sessionStorage.removeItem(KEY);showLogin("Your session is invalid or expired. Please sign in again.",true);return;}
      showAccount(data.user);
    }catch(e){showLogin("Could not reach the authentication service. Check your connection and try again.",true);}
  }
  document.getElementById("logout").addEventListener("click",()=>{sessionStorage.removeItem(KEY);showLogin("You have signed out.");});
  checkSession();
})();
