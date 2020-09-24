import React from "react";
import { makeStyles } from "@material-ui/styles";
import greetingIcon from "../Assets/Group 4132.svg";
function Ordersucessfullypage() {
  const useStyle = makeStyles((theme) => ({
    mainLayout: {
      position: "relative",
      top: "80px",
    },
    greetingImage: {
      position: "relative",
      height: "200px",
      marginTop: "17px",
    },
    greetingLabel: {
      ...theme.typography.orderSucessMessage,
      position: "relative",
      letterSpacing: ".05rem",
      top: "-80px",
      marginLeft: "5px",
    },
    greetingInstruction: {
      ...theme.typography.lastPage,
      position: "relative",
    },
    companyDetailsSection: {
      display: "flex",
      flexDirection: "column",
      borderStyle: "ridge",
      margin: "30px 18% 0 18%",
    },
    companyDetailsHeadingSection: {
        ...theme.typography.companyDetailsHeading,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      padding:"6px 0",
      background: "rgb(240,240,240)",
      borderBottom:"ridge",
    },
    companyDetailsContentsSection: {
        ...theme.typography.companyDetailsContent,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    companySection:{
      paddingTop:"8px",
        width:"300px",
    },
    companySectionMiddle:{
      paddingTop:"8px",
        width:"300px",
        borderRight: "ridge",
        borderLeft: "ridge",
    },
    companySectionHeading:{
        width:"300px",
    },
    companySectionAddressContent:{
        paddingTop:"8px",
        width:"300px",
        textAlign:'left',
        padding:"0 5px",
    },


  }));
  const classes = useStyle();

  return (
    <div className={classes.mainLayout}>
      <img
        className={classes.greetingImage}
        src={greetingIcon}
        alt="greerting Imag"
      />
      <div className={classes.greetingLabel}>Order Placed Successfully</div>
      <div className={classes.greetingInstruction}>
        hurray!!! your order is confirmed <br />
        the order id is #123456 save the order id for <br />
        further communication..
      </div>
      <div className={classes.companyDetailsSection}>
        <div className={classes.companyDetailsHeadingSection}>
          <div className={classes.companySectionHeading}>Email us</div>
          <div className={classes.companySectionHeading}>Contact us</div>
          <div className={classes.companySectionHeading}>Address</div>
        </div>
        <div className={classes.companyDetailsContentsSection}>
          <div className={classes.companySection}>
            {" "}
            admin@bookstore.com
          </div>
          <div className={classes.companySectionMiddle}>
            +91 8163475881
          </div>
          <div className={classes.companySectionAddressContent}>
            42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near
            Kumarakom restaurant, HSR Layout, Bangalore 560034
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ordersucessfullypage;
