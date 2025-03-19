import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

interface CourierOption {
  label: string;
  value: string;
  icon: string;
}

interface CourierDropdownProps {
  value: string;
  onSelect: (value: string) => void;
  error?: string;
}

const courierOptions: CourierOption[] = [
  { label: 'Delhivery 🚚', value: 'delhivery', icon: 'truck-delivery' },
  { label: 'DTDC 🚛', value: 'dtdc', icon: 'truck-fast' },
  { label: 'Bluedart ✈️', value: 'bluedart', icon: 'airplane' },
];

const CourierDropdown = ({ value, onSelect, error }: CourierDropdownProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedOption = courierOptions.find(option => option.value === value);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dropdownButton, error && styles.errorButton]}
        onPress={() => setModalVisible(true)}
      >
        {selectedOption ? (
          <View style={styles.selectedOption}>
            <Icon name={selectedOption.icon} size={24} color={COLORS.primary} />
            <Text style={styles.selectedText}>{selectedOption.label}</Text>
          </View>
        ) : (
          <Text style={styles.placeholder}>Select Courier 🚀</Text>
        )}
        <Icon name="chevron-down" size={24} color={COLORS.gray} />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <Animatable.View 
            animation="slideInUp"
            duration={300}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Select Courier 🚀</Text>
            {courierOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionItem,
                  value === option.value && styles.selectedItem
                ]}
                onPress={() => {
                  onSelect(option.value);
                  setModalVisible(false);
                }}
              >
                <Icon name={option.icon} size={24} color={value === option.value ? COLORS.primary : COLORS.gray} />
                <Text style={[
                  styles.optionText,
                  value === option.value && styles.selectedOptionText
                ]}>
                  {option.label}
                </Text>
                {value === option.value && (
                  <Icon name="check" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </Animatable.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.medium,
    marginHorizontal: SIZES.base,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
    ...SHADOWS.light,
  },
  errorButton: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  selectedOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    marginLeft: SIZES.base,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  placeholder: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.small,
    marginTop: 4,
    marginLeft: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: SIZES.medium,
    ...SHADOWS.dark,
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.medium,
    textAlign: 'center',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedItem: {
    backgroundColor: COLORS.lightGray,
  },
  optionText: {
    flex: 1,
    marginLeft: SIZES.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default CourierDropdown; 