"use client"; // Using State Management
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';
import Provider from './Provider';

const Nav = () => {
  // const isUserLoggedIn = true; //判斷使用者登入狀況，顯示相對應 Navbar

  const { data : session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  //User SignIn
  useEffect (()=>{
    const setUpProviders = async ()=>{
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link href="/" className="flex gap-2 ">
        <Image
          src="/assets/images/logo.jpg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain ml-0"
        />
        <p className="logo_text"> Prompt Hub Community</p>
      </Link>

      {/* Desktop Navigation 小螢幕不顯示*/}
      <div className="sm:flex hidden">
        {session?.user ? ( 
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image} // '?' prevents an error in case either session or session.user is null or undefined.
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          // let the user signin
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={()=>setToggleDropdown((prev)=>!prev)} //避免利用 !toggleDropdown
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link 
                  href="/profile"
                  className="dropdown_link"
                  onClick={()=>setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link 
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={()=>setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={()=>{
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) :(
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav