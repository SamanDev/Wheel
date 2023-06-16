import React from "react";

import Menu from "./menu";

const Home = () => {
  return (
    <div className="home">
      <div className="cadr">
        <img src="/assets/logo.png" className="logo" />
        <div className="container">
          <div class="markdown prose w-full break-words dark:prose-invert light">
            <p>Privacy Policy for Wheel of Persia</p>
            <p>Effective Date: Friday, June 2, 2023</p>
            <p>
              At Wheel of Persia, we value your privacy and are committed to
              protecting your personal information. This Privacy Policy outlines
              how we collect, use, disclose, and safeguard your information when
              you visit our website{" "}
              <a href="https://wheelofpersia.com" target="_new">
                https://wheelofpersia.com
              </a>{" "}
              . Please read this Privacy Policy carefully to understand our
              practices regarding your personal data and how we will treat it.
              By using our Website, you consent to the terms of this Privacy
              Policy.
            </p>
            <ol>
              <li>
                <p>
                  Information We Collect We may collect personal information
                  that you provide directly to us when you use our Website, such
                  as your name, email address, phone number, and other contact
                  information. Additionally, we may collect certain information
                  automatically when you visit our Website, including your IP
                  address, browser type, operating system, referring URLs, and
                  information about your usage of our Website.
                </p>
              </li>
              <li>
                <p>
                  Use of Information We use the information we collect to
                  operate, maintain, and improve our Website and to provide the
                  services you request. We may also use your information to
                  communicate with you, send you promotional materials, and
                  personalize your experience on our Website. We may use your IP
                  address and other automatically collected information to help
                  diagnose problems with our server, administer our Website,
                  analyze trends, track users' movements, and gather broad
                  demographic information for aggregate use.
                </p>
              </li>
              <li>
                <p>
                  Sharing of Information We may share your personal information
                  with trusted third parties who assist us in operating our
                  Website, conducting our business, or providing services to
                  you. These third parties are bound by confidentiality
                  obligations and are not authorized to use your personal
                  information for any other purpose. We may also disclose your
                  information when required by law, such as to comply with a
                  subpoena, court order, or other legal process.
                </p>
              </li>
              <li>
                <p>
                  Cookies and Similar Technologies We use cookies and similar
                  technologies to collect information about your browsing
                  activities on our Website. Cookies are small files that a
                  website or its service provider transfers to your device's
                  hard drive through your web browser. These technologies help
                  us analyze trends, administer the website, track users'
                  movements around the site, and gather demographic information.
                </p>
              </li>
              <li>
                <p>
                  Data Security We implement reasonable security measures to
                  protect the confidentiality, integrity, and availability of
                  your personal information. However, please note that no method
                  of transmission over the internet or electronic storage is
                  completely secure, and we cannot guarantee the absolute
                  security of your information.
                </p>
              </li>
              <li>
                <p>
                  External Links Our Website may contain links to third-party
                  websites. We are not responsible for the privacy practices or
                  content of those websites. We encourage you to review the
                  privacy policies of those websites before providing any
                  personal information.
                </p>
              </li>
              <li>
                <p>
                  Children's Privacy Our Website is not intended for individuals
                  under the age of 16. We do not knowingly collect personal
                  information from children. If you are a parent or guardian and
                  believe that your child has provided us with personal
                  information, please contact us immediately.
                </p>
              </li>
              <li>
                <p>
                  Changes to the Privacy Policy We may update this Privacy
                  Policy from time to time. Any changes we make will be posted
                  on this page, and the revised date will be indicated at the
                  top of the page. We encourage you to review this Privacy
                  Policy periodically for any updates or changes.
                </p>
              </li>
              <li>
                <p>
                  Contact Us If you have any questions, comments, or concerns
                  about this Privacy Policy or our privacy practices, please
                  contact us at info@wheelofpersia.com.
                </p>
              </li>
            </ol>
            <p>
              By using our Website, you acknowledge that you have read and
              understood this Privacy Policy and agree to be bound by its terms.
            </p>
            <p>This Privacy Policy was last updated on Friday, June 2, 2023.</p>
          </div>
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Home;
