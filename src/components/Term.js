import React from "react";

import Menu from "./menu";

const Home = () => {
  return (
    <div className="home">
      <div className="cadr">
        <img src="/assets/logo.png" className="logo" />
        <div className="container">
          <p>
            Certainly! If you need a sample of Terms and Conditions text, here's
            a basic template that you can customize and adapt to your specific
            needs:
          </p>
          <br />
          <p>
            <strong>Terms and Conditions</strong>
          </p>
          <p>
            These Terms and Conditions ("Agreement") govern your use of Wheel of
            Persia ("the Website") and any services provided by or through the
            Website. By accessing or using the Website, you agree to be bound by
            this Agreement.
          </p>
          <ol>
            <li>
              <p>
                <strong>Acceptance of Terms</strong>
              </p>
              <p>
                By using the Website, you acknowledge that you have read,
                understood, and agreed to be bound by these Terms and
                Conditions. If you do not agree to these terms, please refrain
                from using the Website.
              </p>
            </li>
            <li>
              <p>
                <strong>Intellectual Property</strong>
              </p>
              <p>
                All content on the Website, including but not limited to text,
                graphics, logos, images, and software, is the property of Wheel
                of Persia or its licensors and is protected by intellectual
                property laws. You may not use, reproduce, modify, distribute,
                or display any of the content without prior written consent from
                Wheel of Persia.
              </p>
            </li>
            <li>
              <p>
                <strong>User Conduct</strong>
              </p>
              <p>
                You agree to use the Website for lawful purposes and in a manner
                that does not infringe upon the rights of others. You shall not
                engage in any activity that may disrupt or interfere with the
                proper functioning of the Website.
              </p>
            </li>
            <li>
              <p>
                <strong>Privacy Policy</strong>
              </p>
              <p>
                Our Privacy Policy outlines how we collect, use, and protect
                your personal information. By using the Website, you consent to
                the collection and use of your information as described in the
                Privacy Policy.
              </p>
            </li>
            <li>
              <p>
                <strong>Disclaimer of Warranties</strong>
              </p>
              <p>
                The Website is provided on an "as is" and "as available" basis.
                Wheel of Persia makes no warranties, express or implied,
                regarding the Website's reliability, accuracy, or availability.
                You use the Website at your own risk.
              </p>
            </li>
            <li>
              <p>
                <strong>Limitation of Liability</strong>
              </p>
              <p>
                Wheel of Persia shall not be liable for any direct, indirect,
                incidental, consequential, or punitive damages arising out of or
                relating to the use or inability to use the Website. This
                includes any damages resulting from the unauthorized access to
                or alteration of your transmissions or data.
              </p>
            </li>
            <li>
              <p>
                <strong>Modifications to the Agreement</strong>
              </p>
              <p>
                Wheel of Persia reserves the right to modify or update this
                Agreement at any time without prior notice. It is your
                responsibility to review this Agreement periodically for
                changes. Continued use of the Website after any modifications
                constitutes your acceptance of the revised Agreement.
              </p>
            </li>

            <li>
              <p>
                <strong>Contact Information</strong>
              </p>
              <p>
                If you have any questions or concerns regarding this Agreement,
                please contact us at info@wheelofpersia.com.
              </p>
            </li>
          </ol>
          <br />
          <p>
            Please note that this is a generic template and may not cover all
            the specific requirements or legal aspects applicable to your
            website. It is always recommended to consult with a legal
            professional to ensure that your Terms and Conditions adequately
            address your specific circumstances and comply with relevant laws
            and regulations.
          </p>

          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Home;
