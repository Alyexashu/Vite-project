import { Modal } from "antd";
import { useEffect, useState } from "react";
import { data } from "../constants";

const BaseModal = (props) => {
   // eslint-disable-next-line react/prop-types
   const { open, onClose, content } = props;

   const [mcontent, setMContent] = useState(null);

   useEffect(() => {
      console.log({ content });
      const staticContent = data[content] || [];
      setMContent(staticContent);
   }, [content]);
   console.log({ mcontent });

   return (
      <Modal
         open={open}
         onClose={onClose}
         footer={false}
         width={"80%"}
         style={{ padding: "1rem" }}
         closeIcon={false}
      >
         <div className="modal_content">
            <div className="modal_heading">
               <h3>
                  {content === "terms" ? "Terms and Conditions" : "Privacy Policy"}
               </h3>
            </div>
            <div className="content_container">
               {mcontent?.map((c, idx) => (
                  <div key={idx}>
                     <h2>{c?.heading}</h2>
                     <p>{c?.para}</p>
                  </div>
               ))}
            </div>
            <button className="modal_close" onClick={onClose}>Close</button>
         </div>
      </Modal>
   );
};

export default BaseModal;
