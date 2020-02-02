const K_SIZE = 70;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  //   border: "5px solid #f44336",
  borderRadius: K_SIZE,
  backgroundColor: "white",
  textAlign: "center",
  color: "#3f51b5",
  fontSize: 16,
  fontWeight: "bold",
  //   padding: 4,
  cursor: "pointer",
  $hover: true
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle
  //   border: "5px solid #3f51b5",
  //   color: "#f44336"
};

const Raptor = () => (
  <div style={greatPlaceStyleHover}>
    <svg x="0px" y="0px" viewBox="0 0 864 864">
      <path
        d="M704.172,432.004c0-150.322-121.847-272.176-272.167-272.176c-150.313,0-272.177,121.854-272.177,272.176
      c0,150.321,121.863,272.169,272.177,272.169C582.325,704.172,704.172,582.325,704.172,432.004z"
      />
      <polyline
        fill="#FFFFFF"
        points="428.683,526.339 400.624,583.063 333.898,615.161 367.262,554.7 425.248,526.339 329.927,551.716 
      227.459,526.339 328.071,492.749 423.661,522.606 290.21,455.428 213.954,319.841 358.524,388.996 428.683,515.888 383.148,372.205 
      384.236,368.507 428.683,217.322 480.852,366.605 434.781,515.888 503.888,389.744 650.046,319.841 572.994,453.936 
      437.959,522.606 533.279,492.749 636.542,523.351 533.279,553.207 435.575,527.829 494.356,553.207 529.307,615.161 
      462.583,583.063 432,531.562 "
      />
      <path
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeMiterlimit="10"
        d="M623.373,394.194v-34.077l-120.796-34.103l-22.437,66.463
      l-129.417,60.525l-135.987-70.14l-6.756,15.581l133.588,116.586l57.817-7.664l19.241,32.798l-40.041,34.124
      c9.488,10.356,60.784,36.836,60.784,36.836l25.191-2.766l-34.262-35.532l25.89-17.396l12.872-58.715l62.837-24.296l-3.854,33.212
      l14.588,3.42l24.923-51.034l-46.001-18.883l15.536-49.255L623.373,394.194z"
      />
    </svg>
  </div>
);

export default Raptor;
