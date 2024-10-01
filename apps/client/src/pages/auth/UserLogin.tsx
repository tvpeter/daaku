const UserLogin = () => {
  return (
    <>
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Daaku | Login</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png" />
        <link rel="stylesheet" href="css/normalize.css" />
        <link rel="stylesheet" href="css/main.css" />
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/all.min.css" />
        <link rel="stylesheet" href="fonts/flaticon.css" />
        <link rel="stylesheet" href="css/animate.min.css" />
        <link rel="stylesheet" href="style.css" />
        <script src="js/modernizr-3.6.0.min.js"></script>
      </head>

      <body>
        <div className="login-page-wrap">
          <div className="login-page-content">
            <div className="login-box">
              <div className="item-logo">
                <img src="img/logo2.png" alt="logo" />
              </div>
              <form
                action="https://www.radiustheme.com/demo/html/Dk/Daaku/Daaku/index.html"
                className="login-form"
              >
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Enter usrename"
                    className="form-control"
                  />
                  <i className="far fa-envelope"></i>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="text"
                    placeholder="Enter password"
                    className="form-control"
                  />
                  <i className="fas fa-lock"></i>
                </div>
                <div className="form-group d-flex align-items-center justify-content-between">
                
                  <a href="#" className="forgot-btn">
                    Forgot Password?
                  </a>
                </div>
                <div className="form-group">
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/jquery.scrollUp.min.js"></script>
        <script src="js/main.js"></script>
      </body>
      </>
  )
}

export default UserLogin
