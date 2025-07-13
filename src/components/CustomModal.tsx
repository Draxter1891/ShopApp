import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';

type CustomAlertProps = {
  visible: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  mode?: 'alert' | 'confirm';
};

const CustomModal: React.FC<CustomAlertProps> = ({
  visible,
  title = 'Alert',
  message = '',
  onCancel,
  onConfirm,
  mode
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.alertBox}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              <View style={styles.buttonRow}>

                {mode === 'confirm' && <Pressable style={styles.button} onPress={onCancel}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>}
                <Pressable style={styles.button} onPress={onConfirm}>
                  <Text style={styles.okText}>OK</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent:'space-evenly',
  },
  button: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelText: {
    color: '#ff3b30', // iOS red
    fontSize: 16,
    fontWeight: '500',
  },
  okText: {
    color: '#007AFF', // iOS blue
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CustomModal;
