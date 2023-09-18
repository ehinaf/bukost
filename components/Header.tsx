"use client";

import Link from "next/link";
import { useState } from "react";

import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

import { navbarLinks } from "@/constant";
import { ButtonSignUp } from "@/components/ButtonSignUp";

interface ListMenuProps {
  children: React.ReactNode;
  NavLink: string;
  itemSubMenu?: Array<{
    routeDetail: string;
    labelDetail: string;
    itemDetail?: Array<{ subRoute: string; subLabel: string }>;
  }>;
}

const ListMenu = ({ children, NavLink, itemSubMenu }: ListMenuProps) => {
  const [openSubMenu, setOpenSubMenu] = useState(false);

  return (
    <li className="group/menu relative">
      <Link
        href={NavLink}
        className={`lg:py-8 flex cursor-pointer font-medium items-center group-hover:text-primary-2 text-primary-5 border-b-0 hover:border-b-2 hover:border-primary-2 transition-all ease-linear duration-100  justify-between`}
        onClick={() => {
          setOpenSubMenu(!openSubMenu);
        }}
      >
        {children}
        {itemSubMenu && (
          <span
            className={`duration-300 lg:group-hover/menu:rotate-180  lg:rotate-0 ${
              openSubMenu && "rotate-180"
            }`}
          >
            <ChevronDownIcon className="h-5 w-5" />
          </span>
        )}
      </Link>
      {itemSubMenu && (
        <div
          className={`${
            openSubMenu ? "block" : "max-lg:hidden"
          } left-0 top-full rounded-bl-md rounded-br-md  p-3 lg:invisible lg:absolute lg:top-[120%] lg:w-[300px] lg:space-y-1 lg:rounded-b-md lg:bg-white lg:opacity-0 lg:shadow-[0px_10px_40px_rgba(0,0,0,0.05)] lg:duration-300 lg:group-hover/menu:visible lg:group-hover/menu:top-full lg:group-hover/menu:opacity-100 `}
        >
          {itemSubMenu &&
            itemSubMenu.map((item, i) => {
              const detailItem = item.itemDetail;
              return (
                <div key={i} className="group/submenu relative ">
                  <Link
                    href={item.routeDetail}
                    className=" flex text-primary-5 font-medium hover:text-primary-3 items-center justify-between rounded px-2 py-1 duration-300 hover:bg-[#F8F9FF]"
                  >
                    {item.labelDetail}
                    {detailItem && (
                      <ChevronRightIcon className="h-5 w-5 max-lg:hidden z-0" />
                    )}
                  </Link>

                  <div
                    className={`block left-0 top-full z-10 ${
                      detailItem
                        ? "p-3"
                        : "lg:group-hover/submenu:invisible p-0"
                    } rounded-md  lg:invisible lg:absolute lg:left-3/4 lg:top-[120%] lg:w-[300px] lg:space-y-1 lg:rounded-b-md lg:bg-white lg:opacity-0 lg:shadow-[0px_10px_40px_rgba(0,0,0,0.05)] lg:duration-300 lg:group-hover/submenu:visible lg:group-hover/submenu:top-0 lg:group-hover/submenu:opacity-100 `}
                  >
                    {detailItem &&
                      detailItem.map((detail, index) => {
                        return (
                          <Link
                            key={index}
                            href={detail.subRoute}
                            className="flex text-primary-5 hover:text-primary-3 items-center justify-between rounded px-2 py-1 duration-300 hover:bg-[#F8F9FF]"
                          >
                            {detail.subLabel}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`flex w-full sticky top-0 z-50  items-center bg-white justify-between h-20 lg:h-[90px] px-6 lg:px-52 shadow-[0px_7px_8px_0px_rgba(0,0,0,0.06)] `}
    >
      <Link href={"/"} as={"/"}>
        BuKos
      </Link>

      <button
        className="absolute right-6 top-1/2 block -translate-y-1/2 cursor-pointer bg-transparent lg:hidden"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span
          className={`relative mx-auto my-2 block h-[2px] w-8 bg-gray-900 transition-all duration-300 ${
            open && "rotate-45"
          }`}
        ></span>
        <span
          className={`relative mx-auto my-2 block h-[2px] w-8 bg-gray-900 transition-all duration-300 ${
            open && "hidden"
          }`}
        ></span>
        <span
          className={`relative mx-auto my-2 block h-[2px] w-8 bg-gray-900 transition-all duration-300 ${
            open && "top-[-10px] -rotate-45"
          }`}
        ></span>
      </button>

      <nav
        className={`absolute w-[350px]  top-24 right-1 bg-white shadow-md p-4 rounded-b-md lg:w-auto lg:bg-transparent lg:shadow-none lg:p-0 lg:visible lg:static lg:opacity-100 duration-300 ${
          open ? "visible top-full opacity-100 " : "invisible top-12 opacity-0"
        }`}
      >
        <ul className="flex w-full md:w-auto flex-col md:flex-row md:gap-x-8 gap-y-3 md:items-center">
          {navbarLinks.map((item, i) => (
            <ListMenu
              key={i}
              NavLink={item.route}
              itemSubMenu={item.subMenuItems}
            >
              {item.label}
            </ListMenu>
          ))}
        </ul>
      </nav>
      <ButtonSignUp />
    </header>
  );
};

export default Header;
