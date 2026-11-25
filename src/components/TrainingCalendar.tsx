import { useEffect, useState } from "react";
import { EventCalendar } from "@mui/x-scheduler/event-calendar";
import type { SchedulerEvent } from "@mui/x-scheduler/models";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { getTrainings } from "../api";
import type { Training } from "../types";

function TrainingCalendar() {
  const [events, setEvents] = useState<SchedulerEvent[]>([]);

  useEffect(() => {
    getTrainings()
      .then((data: Training[]) =>
        setEvents(
          data.map(t => ({
            id: t.id,
            title: t.activity + (t.customer
              ? " / " + t.customer.firstname + " " + t.customer.lastname
              : ""),
            start: dayjs(t.date).format("YYYY-MM-DDTHH:mm:ss"),
            end: dayjs(t.date).add(t.duration, "minute").format("YYYY-MM-DDTHH:mm:ss"),
          }))
        )
      )
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>Calendar</Typography>
      <div style={{ height: 650, width: "100%" }}>
        <EventCalendar
          events={events}
          readOnly
          views={["month", "week", "day", "agenda"]}
          defaultView="week"
          dateLocale="fi-FI"
          defaultPreferences={{ weekStartsOn: 1 }}
        />
      </div>
    </>
  );
}

export default TrainingCalendar;