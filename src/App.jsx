import { GiHamburgerMenu } from "react-icons/gi";
import mobilePng from "../src/assets/mobile.png";
import { useState } from "react";
import { handlePhoneVerify } from "./api/phone";
import BaseModal from "./components/BaseModal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const STEPS = ["PHONE_OTP", "OTP_VERIFY"];

const App = () => {
   const [currentStep, setCurrentStep] = useState("PHONE_OTP");
   const [error, setError] = useState("");
   const [phone, setPhone] = useState("");
   const [modalVisible, setModalVisible] = useState(false);
   const [modalContent, setModalContent] = useState("");
   const [loading, setLoading] = useState(false);

   const isButtonDisabled = phone.length === 0;

   const handleSubmit = async () => {
      try {
         setLoading(true);
         setError("");
         const result = await handlePhoneVerify(phone);
         if (result.name === "AxiosError") {
            setError("Error while Aquiring User Phone");
         }
         if (result) {
            console.log(result);
         }
      } catch (error) {
         console.log("Something went wrong", error);
         setLoading(false);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="app_container">
         <div className="gradient_container"></div>
         <div className="form_container">
            <div className="flex_container">
               <GiHamburgerMenu size={40} style={{ cursor: "pointer" }} />
               <select>
                  <option disabled>Language</option>
                  <option>English</option>
               </select>
            </div>
            <img src={mobilePng} alt="mobile" className="small_icon" />
            <div className="stepper_container">
               {STEPS.map((step, idx) => (
                  <div key={idx} className="step">
                     <div
                        className={`indicator ${
                           step !== currentStep ? "active " : "partial part"
                        }`}
                     ></div>
                  </div>
               ))}
            </div>
            <div className="flex_center">
               <img src={mobilePng} alt="mobile" className="big_icon" />
            </div>
            <div className="flex_col">
               <div className="flex_row form_input">
                  <PhoneInput
                     country={"eg"}
                     enableSearch={true}
                     value={phone}
                     onChange={(phone) => setPhone(phone)}
                     inputClass="input"
                  
                  />
               </div>
               <strong>Enter your phone number</strong>
            </div>
            <div className="flex_center">
               <button
                  className="form_button"
                  disabled={isButtonDisabled || loading}
                  onClick={handleSubmit}
               >
                  Submit
               </button>
            </div>
            <div className="flex_center">
               {error && <span className="error_text">{error}</span>}
            </div>
            <span className="info_text">
               Entertainment is a subscription service that will automatically
               renew for 1 USD/ 7 Day(s). You can unsubscribe from the service
               at anytime, by sending STOP to **** for (operator) . To make use
               of this service, you must be 18 or more unless you have received
               permission from your parents or the person who is authorized to
               pay your bill.
            </span>
            <div className="flex_row">
               <span
                  className="link_text"
                  onClick={() => {
                     setModalContent("terms");
                     setModalVisible(true);
                  }}
               >
                  Terms & condition
               </span>
               <span className="">-</span>
               <span
                  className="link_text"
                  onClick={() => {
                     setModalContent("policies");
                     setModalVisible(true);
                  }}
               >
                  Privacy Policy
               </span>
            </div>
         </div>
         <BaseModal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            content={modalContent}
         ></BaseModal>
      </div>
   );
};

export default App;
