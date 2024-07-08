import axios from "axios";

export const handlePhoneVerify = async (phone) => {
   try {
      const response = await axios.post(
         "https://cors-anywhere.herokuapp.com/https://endpoint/UsersAquisition/",
         {
            DeviceInfo: {
               LangCode: "EN",
            },
            Referrer: {
               MBSDK: {
                  SourceURL:
                     "https://dxv9ab0p31jil.cloudfront.net/?SMCampaign=fb567c85-b398-410c-b87c-56ed6206092d",
                  isWebView: false,
               },
            },
            Request: {
               Action: 2,
               TransactionID:
                  "ce6531b8-96b4-4dbc-bae8-19f32c7b2832-1720201145982",
               SessionID: "06e0aafd-ea7a-4258-8256-ff2b3521e50a",
               MSISDN: phone,
               PinCode: "",
               AntifraudLastStatuscode: 0,
               Data: "",
            },
         },
         {
            headers: {
               AccessToken: "0e186445-0647-417c-ae27-8098533f1914",
               EncryptionKey: "FtmJ7frzTyWOzintybbqIWzwwclcPtaI",
               CampaignId: "6a0fa162-fb4c-4074-a6d4-402744e3590b",
            },
         }
      );
      return response.data;
   } catch (error) {
      if (error.response && error.response.status === 403) {
         console.error("CORS error detected. Ensure the server allows requests from your origin.");
      } else {
         console.error(error);
      }
      return error; 
   }
};
