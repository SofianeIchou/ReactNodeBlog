import Link from "next/link"
import { useCallback, useContext } from "react"
import { CgProfile } from "react-icons/cg"
import { FiLogOut } from "react-icons/fi"
import AppContext from "./AppContext"
const Navbar = () => {
  const { session, logout } = useContext(AppContext)
  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return (
    <div className="">
      <div className="">
        <Link href="/">Blog de avetis</Link>
      </div>
      {!session ? (
        <div className="">
          <div className="">
            <Link href="/sign-in">
              <a>Se connecter</a>
            </Link>
          </div>
          <div className="">
            <Link href="/sign-up">
              <a>S'inscrire</a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="">
            <Link href={"/profile/" + session.payload.user.id}>
              <a>
                <CgProfile />
              </a>
            </Link>
          </div>
          <div className="">
            <a href="/" onClick={handleLogout}>
              <FiLogOut />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
