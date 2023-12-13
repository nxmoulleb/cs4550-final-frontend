function Nav() {
  return (
    <ul class="nav nav-pills justify-content-center">
      <li class="nav-item">
        <a href="/#/" class="nav-link">Home</a>{" "}
      </li>
      <li class="nav-item">
        <a href="/#/signin" class="nav-link">Sign In/Register</a>
      </li>
      <li class="nav-item">
        <a href="/#/account" class="nav-link">Account</a>
      </li>
      <li class="nav-item">
        <a href="/#/search" class="nav-link">Search Art</a>
      </li>
      <li class="nav-item">
        <a href="/#/search/users" class="nav-link">Search Users</a>
      </li>
    </ul>
  );
}

export default Nav;
