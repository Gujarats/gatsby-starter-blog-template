import React from "react"

const SuccessMessage = ({ message }) => {
  return (
    <div className=" mt-2">
      {message !== undefined && message !== "" ? (
        <p className="text-red-600">Oops, something went wrong : {message}</p>
      ) : (
        <p className="text-green-600">
          Registration successful! We will send you the Meal Plan via Email
        </p>
      )}
    </div>
  )
}

export default SuccessMessage
