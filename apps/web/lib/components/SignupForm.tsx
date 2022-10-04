import { useEffect, useState } from "react"
import useAxios from "axios-hooks"

const SignupForm = () => {
  const [email, setEmail] = useState("")
  const [pageUri, setPageUri] = useState<string>()

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "/api/emailSignup",
      method: "POST",
      data: { email, pageUri },
    },
    {
      manual: true,
    }
  )

  // Clear the form on successful submitting it
  useEffect(() => {
    if (data?.success === true && !loading) {
      setEmail("")
    }
  }, [data?.success, loading])

  // Get the url the user is currently visiting.
  // Optional, but enriches the data we have in HubSpot.
  useEffect(() => {
    setPageUri(window.location.href)
  })

  return (
    <>
      <input
        type={"email"}
        placeholder={"me@example.com"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type={"submit"}
        onClick={() => refetch()}
        disabled={loading}
      >
        Signup
      </button>
    </>
  )
}

export default SignupForm
