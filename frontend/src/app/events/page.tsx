"use client"

import React, { useEffect, useState } from "react"
import {
  fetchEvents,
  participateEvent,
  cancelParticipation,
} from "./eventService"
import { useAuth } from "../context/AuthContext"

type Event = {
  id: number
  title: string
  description: string
  maxAttendees: number
  participants?: Array<{
    id: number
    email: string
  }>
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents()
        setEvents(fetchedEvents)
        setLoading(false)
      } catch (err) {
        setError("Impossible de charger les événements")
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const handleParticipate = async (eventId: number) => {
    try {
      const response = await participateEvent(eventId)

      if (response.status === "already_participating") {
        alert("Vous participez déjà à cet événement")
      } else if (response.status === "success") {
        alert("Participation réussie !")
      }

      const updatedEvents = await fetchEvents()
      setEvents(updatedEvents)
    } catch (error) {
      alert(error.message || "Erreur lors de la participation")
    }
  }

  const handleCancelParticipation = async (eventId: number) => {
    try {
      await cancelParticipation(eventId)
      const updatedEvents = await fetchEvents()
      setEvents(updatedEvents)
    } catch (error) {
      alert("Erreur lors de l'annulation")
    }
  }

  const userIsParticipating = (event: Event): boolean => {
    return (
      Array.isArray(event.participants) &&
      event.participants.some((participant) => participant.id === user.userId)
    )
  }

  if (loading) {
    return <p>Chargement...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">Événements</h1>
      {events.length === 0 ? (
        <p>Aucun événement disponible</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>{event.description}</p>
              <p>Participants maximum: {event.maxAttendees}</p>
              {userIsParticipating(event) ? (
                <>
                  <p className="text-green-500">
                    Vous participez déjà à cet événement
                  </p>
                  <button
                    className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
                    onClick={() => handleCancelParticipation(event.id)}
                  >
                    Annuler la participation
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
                  onClick={() => handleParticipate(event.id)}
                >
                  Participer
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Events
