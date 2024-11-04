import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const PaymentSuccessScreen = ({ navigation, route }) => {
  const { amount, refNumber, paymentMethod, paymentOption } = route.params;
  const viewRef = useRef();
  // Get current date and time
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const capitalizeFirstLetterOfEachWord = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const downloadPDFReceipt = async () => {
    try {
      // Capture the view as an image
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      // Create a PDF from the captured image
      const options = {
        html: `
        <html>
          <body>
            <h1>Payment Receipt</h1>
            <img src="${uri}" style="width: 100%;"/>
            <p>Ref Number: ${refNumber}</p>
            <p>Date: ${dateString}</p>
            <p>Time: ${timeString}</p>
            <p>Payment Method: ${paymentMethod}</p>
            <p>Payment Option: ${capitalizeFirstLetterOfEachWord(
              paymentOption
            )}</p>
            <p>Amount: $${amount.toFixed(2)}</p>
          </body>
        </html>
      `,
        fileName: `receipt_${refNumber}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);

      // Alert with the PDF file path or open it directly
      alert('PDF generated', `PDF saved to: ${file.filePath}`);

      // Open the PDF
      Linking.openURL(file.filePath);
    } catch (error) {
      console.error('Error creating PDF:', error);
      alert('Could not create PDF. Please try again later.' + error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style = {{width: "100%", height:"auto"}} ref={viewRef}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/icons/payment-success.png')} // Replace with your success icon image source
            style={styles.successIcon}
          />
        </View>

        {/* Success Message */}
        <Text style={styles.successText}>Payment success!</Text>

        {/* Payment Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ref number</Text>
            <Text style={styles.detailValue}>{refNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{dateString}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{timeString}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment method</Text>
            <Text style={styles.detailValue}>{paymentMethod}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment option</Text>
            <Text style={styles.detailValue}>
              {capitalizeFirstLetterOfEachWord(paymentOption)}
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>${amount.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.pdfButton} onPress={downloadPDFReceipt}>
        <Text style={styles.pdfButtonText}>📄 Get PDF receipt</Text>
      </TouchableOpacity>

      {/* View Booking Button */}
      <TouchableOpacity
        style={styles.viewBookingButton}
        onPress={() => navigation.navigate('Booking Home Screen')}>
        <Text style={styles.viewBookingButtonText}>View booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make it circular
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    position: 'relative', // Position relative for the divider
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: 'gray',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    marginTop: 90,
    height: 1,
    backgroundColor: '#ccc', // Light gray color for the divider
    position: 'absolute',
    top: 65, // Adjust this value to position the divider
    left: 16,
    right: 16,
  },
  pdfButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  pdfButtonText: {
    fontSize: 14,
    color: '#00AEEF',
  },
  viewBookingButton: {
    backgroundColor: '#00AEEF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  viewBookingButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentSuccessScreen;
