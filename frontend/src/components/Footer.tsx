import React from 'react';
import { Copyright } from 'lucide-react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-bgN sticky bottom-0 left-0 right-0">
        <div className=" pt-[4.5rem]">
          <div className="container grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-[0.5rem] px-[0.3rem] py-[2rem] text-para border-borderN border-t-[1px]">
            <div>
              <ul className="text-para">
                <li className="text-xl font-extrabold text-title">
                  NOTE NESTLE
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="font-extrabold mb-[1rem] text-title">Email</li>
                <li className="text-para">notenestle@gmail.com</li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="font-extrabold mb-[1rem] text-title">Privacy</li>
                <li>Privacy Policy </li>
                <li>Terms and Services</li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="font-extrabold mb-[1rem] text-title">Socials</li>
                <li>LinkedIn</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className=" pb-[1rem] lg:pb-[1.5rem]  justify-between">
            <p className="text-para flex justify-center pt-[1rem] items-center">
              <Copyright />
              2024. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
