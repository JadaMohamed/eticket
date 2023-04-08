import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Recorded from "../assets/Validation/Recorded.svg"
import RecordedMark from "../assets/Validation/RecordedMark.svg"
import Spacer from '../components/Spacer'
import Button from '../components/Button'
import { widthPercentageToDP } from '../constants/Layout'
import { API_URL } from '../constants/Api'

const RecordedTicket = ({ route, navigation }) => {
  const [clientName, setClientName] = useState({firstName: "", lastName: ""});
  const [seatCategoryName, setSeatCategoryName] = useState("");
  useEffect(() => {
    //http://localhost:8000/api/clients/account/3
    const fetchClientName = async () => {
      const response = await fetch(
        `${API_URL}/api/clients/account/${route.params?.client_id}`,
      );
      const data = await response.json();
      setClientName({firstName: data.Account.first_name, lastName: data.Account.last_name});
      console.log("client account meow de meow : ",data);
    };
    const getSeatCategoryName = async () => {
      const response = await fetch(
        //http://localhost:8000/api/seat-categories/3
        `${API_URL}/api/seat-categories/${route.params?.seat_categ_id}`,
      );
      const data = await response.json();
      setSeatCategoryName(data.type_name);
      console.log("client account meow de meow : ",data.Account);
    };

    fetchClientName();
    getSeatCategoryName();
  }, [])

  function formatDateString(dateString) {
    console.log("got the string ", dateString);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const date = new Date(dateString);
  
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const month = monthsOfYear[date.getUTCMonth()];
    const dayOfMonth = date.getUTCDate();
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  
    return `${dayOfWeek}, ${month} ${dayOfMonth} ${year}, ${hours}:${minutes}:${seconds}`;
  }
  
  const doneHandler = () => navigation.pop();
  function updateTicket(ticketId) {
    fetch(`${API_URL}/api/scanner/tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        num_uses: Number(route.params.num_uses) + 1
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Resource updated successfully:', data);
        console.log(data)
      })
      .catch(error => {
        console.error('There was a problem updating the resource:', error);
      });

  }
  return (
    <LinearGradient colors={['#FF7A00', '#FFFFFF']} style={styles.container}>
      <View style={{ position: "relative", flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ position: "relative", alignItems: "center", justifyContent: "center" }}>
          <Recorded />
          <View style={{ position: "absolute", top: widthPercentageToDP("10%"), alignItems: "center", justifyContent: "center" }}>
            <RecordedMark />
            <Spacer />
            <Text style={{ fontSize: 18, fontWeight: "900", color: "#000000" }}>Ticket Valide</Text>
            <Spacer />
            <Text style={{ color: "#808080", fontSize: 12 }}>Event ID: {route.params.event_id}</Text>
            <Text style={{ color: "#808080", fontSize: 12 }}>Ticket ID: {route.params.ticket_id}</Text>
            <Spacer />
            <Text style={{ color: "#808080", fontSize: 12 }}>Seat Category</Text>
            <Spacer />
            <Text style={{ fontSize: 18, fontWeight: "900", color: "#000000" }}>{seatCategoryName}</Text>
          </View>

          <View style={{ position: "absolute", bottom: widthPercentageToDP("7%"), width: "75%" }}>
            <Text style={{ color: "#808080", fontSize: 16, fontWeight: "400", textAlign: "left" }}>Ticket Holder</Text>
            <Spacer size={5} />
            <View style={{ borderRadius: 10, backgroundColor: "#80808033", width: "100%", padding: 10, alignItems: "center", gap: 10, flexDirection: "row" }}>
              <View style={{ backgroundColor: "#97C396", borderRadius: 40, height: 40, width: 40 }}>
              </View>
              <View style={{ flexDirection: "column", width: "100%" }}>
                <Text style={{ color: "#000000", fontSize: 16, fontWeight: "600" }}>{clientName?.firstName} {clientName?.lastName}</Text>
                <Text style={{ fontSize: 14, width: widthPercentageToDP("55%") }} numberOfLines={1} ellipsizeMode={"tail"}>{formatDateString(route.params.created_at)}</Text>
              </View>
            </View>
          </View>
        </View>

      </View>
      <View>
        <Button title={"Attendance Record"} onPress={() => updateTicket(route.params.ticket_id)} backgroundColor="#FF7A00" textColor='white' width={300} />
        <Spacer />
        <Button title={"Done"} onPress={doneHandler} backgroundColor="transparent" textColor='#FF7A00' width={300} borderColor="#FF7A00" />
        <Spacer size={15} />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default RecordedTicket