import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { BarCodeScanner } from 'react-native-qrcode-scanner';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import FlashOff from '../assets/Scanner/FlashOff.svg';
import ArrowBack from '../assets/Scanner/ArrowBack.svg';

const iconsWidthHeight = 20;
const padding = 60;
const iconsContainerHeightWidth = 40;

const QrScanner = ({ route, navigation }) => {
    const [flash, setFlash] = useState(false);
    const [tickets, setTickets] = useState([]);

    const navigateBack = () => navigation.goBack();
    const toggleFlash = () => {
        if (flash)
            setFlash(false);
        else
            setFlash(true);

    };

    const fetchTickets = async () => {
        const response = await fetch(
            `https://e-ticket-server.onrender.com/api/scanner/tickets/event/${route.params.event_id}`,
        );
        const data = await response.json();
        setTickets(data);
        console.log(data);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        const ticket = tickets.find((ticketObj) => ticketObj.qrcode === data);
        if (!ticket) {
            navigation.replace("InvalidTicket", { ticket: ticket, ticket_id: ticket?.ticket_id, event_id: route.params.event_id })
        } else if (ticket.isscanned === true) {
            navigation.replace("RecordedTicket", { ticket: ticket, ticket_id: ticket?.ticket_id, event_id: route.params.event_id })
        } else {
            navigation.replace("ValidTicket", { ticket: ticket, ticket_id: ticket?.ticket_id, event_id: route.params.event_id })
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <QRCodeScanner
                onRead={handleBarCodeScanned}
                flashMode={flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                cameraStyle={{ height: '100%', flex: 1 }}
                showMarker={true}
                markerStyle={{ borderColor: 'white', borderRadius: 17, borderStyle: "dashed" }}

            />

            <View style={styles.textContainer}>
                <Text
                    style={{
                        color: '#FFFFFF',
                        fontSize: 20,
                        fontWeight: '700',
                        top: 28,
                        left: 20,
                        position: 'absolute',
                    }}>
                    Scanning...
                </Text>
                <Text
                    style={{
                        color: '#808080',
                        fontSize: 14,
                        fontWeight: '400',
                        top: 50,
                        left: 20,
                        position: 'absolute',
                    }}>
                    Point the camera at the QR code.
                </Text>
                <TouchableOpacity style={styles.arrowBackContainer} activeOpacity={0.7} onPress={navigateBack}>
                    <ArrowBack width={iconsWidthHeight} height={iconsWidthHeight} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.flashContainer} activeOpacity={0.7} onPress={toggleFlash}>
                    <FlashOff width={iconsWidthHeight} height={iconsWidthHeight} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000044',
    },
    topText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        top: 16,
        left: 16,
    },
    bottomText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        position: 'absolute',
        bottom: 16,
        left: 16,
    },
    arrowBackContainer: {
        position: 'absolute',
        bottom: 15,
        height: iconsContainerHeightWidth,
        width: iconsContainerHeightWidth,
        alignItems: 'center',
        justifyContent: 'center',
        left: padding,
        backgroundColor: '#9982B8',
        borderRadius: 60,
    },
    flashContainer: {
        position: 'absolute',
        bottom: 15,
        height: iconsContainerHeightWidth,
        width: iconsContainerHeightWidth,
        alignItems: 'center',
        justifyContent: 'center',
        right: padding,
        backgroundColor: '#9982B8',
        borderRadius: 60,
    },
});

export default QrScanner;
