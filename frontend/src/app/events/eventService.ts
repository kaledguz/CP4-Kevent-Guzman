export const fetchEvents = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des événements")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erreur lors de la récupération des événements:", error)
    throw error
  }
}

export const participateEvent = async (eventId: number) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/events/${eventId}/participate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error("Erreur lors de la participation à l'événement")
    }

    return await response.json()
  } catch (error) {
    console.error("Erreur lors de la participation:", error)
    throw error
  }
}

export const cancelParticipation = async (eventId: number) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/events/${eventId}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error("Erreur lors de l'annulation de la participation")
    }

    return await response.json()
  } catch (error) {
    console.error("Erreur lors de l'annulation de la participation:", error)
    throw error
  }
}
