import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        )

        history.push(`/detail/${data.link._id}`)
      } catch (err) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <input
          id="link"
          type="text"
          placeholder="Enter link"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          onKeyPress={pressHandler}
        />
        <label htmlFor="link">Enter link</label>
      </div>
    </div>
  )
}
