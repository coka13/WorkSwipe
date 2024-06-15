import "./SecurityPage.css"
import FormComponent from "../../components/FormComponent/FormComponent";
import BasicButtons from "../../components/BasicButtons/BasicButtons";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";

export const SecurityPage = () => {
  return (
    <>
    <div className="securityPage">
      <h4>Security Settings</h4>
      <div className="securityBox">
      <FormComponent
          props={[
            {
              name: "old password",
              formType:"password",
              type: "textarea",
              label: "Old password",
              required: true,
            },
            {
              name: "new password",
              formType:"password",
              type: "textarea",
              label: "New password",
              required: true,
            },
            {
              name: "repeat new password",
              formType:"password",
              type: "textarea",
              label: "Repeat new password",
              required: true,
            },
          ]}
        />
      </div>
      <BasicButtons text={"Submit"} />
      <CustomLinkNavigate to={"/profile"} label={"Go back"}/>
    </div>

    </>
  );
};

export default SecurityPage;
