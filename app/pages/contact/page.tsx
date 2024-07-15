"use client";
import { useEffect } from "react";

interface FormData {
  [key: string]: FormDataEntryValue;
}

const VismeForm = () => {
  useEffect(() => {
    const handleFormSubmit = (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const formValues: FormData = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });
      console.log("Form data:", formValues);
    };

    const formContainer = document.querySelector(".visme_d");
    const form = formContainer?.querySelector("form");
    if (form) {
      form.addEventListener("submit", handleFormSubmit);
    }

    return () => {
      if (form) {
        form.removeEventListener("submit", handleFormSubmit);
      }
    };
  }, []);

  useEffect(() => {
    const scriptId = "visme-form-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script") as HTMLScriptElement;
      script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    } else {
      const scriptClone = script.cloneNode() as HTMLScriptElement;
      document.body.removeChild(script);
      document.body.appendChild(scriptClone);
    }

    return () => {};
  }, []);

  return (
    <div
      className="visme_d"
      data-title="Join us in mentory"
      data-url="8r1p880v-join-us-in-mentory"
      data-domain="forms"
      data-full-page="false"
      data-min-height="500px"
      data-form-id="82665"
    ></div>
  );
};

export default VismeForm;
