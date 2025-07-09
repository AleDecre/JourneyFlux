import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

const CalendarPicker = ({ selectedDates = [], onDateSelect, maxDates = 7 }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];
  
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const isDateSelected = (date) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return selectedDates.includes(dateStr);
  };
  
  const isDateDisabled = (date) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  const handleDatePress = (date) => {
    if (!date || isDateDisabled(date)) return;
    onDateSelect(date);
  };
  
  const days = getDaysInMonth(currentDate);
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={goToPreviousMonth}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.monthYear}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        
        <TouchableOpacity style={styles.navButton} onPress={goToNextMonth}>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      {/* Day names */}
      <View style={styles.dayNamesContainer}>
        {dayNames.map((dayName, index) => (
          <View key={index} style={styles.dayNameCell}>
            <Text style={styles.dayNameText}>{dayName}</Text>
          </View>
        ))}
      </View>
      
      {/* Calendar grid */}
      <View style={styles.calendarGrid}>
        {days.map((date, index) => {
          const isSelected = isDateSelected(date);
          const isDisabled = isDateDisabled(date);
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                isSelected && styles.selectedDayCell,
                isDisabled && styles.disabledDayCell,
              ]}
              onPress={() => handleDatePress(date)}
              disabled={isDisabled}
              activeOpacity={0.7}
            >
              {date && (
                <Text
                  style={[
                    styles.dayText,
                    isSelected && styles.selectedDayText,
                    isDisabled && styles.disabledDayText,
                  ]}
                >
                  {date.getDate()}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      
      {/* Helper text */}
      <View style={styles.helperContainer}>
        <Text style={styles.helperText}>
          {selectedDates.length > 0 
            ? `${selectedDates.length}/${maxDates} giorni selezionati`
            : `Seleziona fino a ${maxDates} giorni`
          }
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  navButton: {
    padding: theme.spacing.sm,
  },
  monthYear: {
    fontSize: theme.fonts.sizes.heading,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text,
  },
  dayNamesContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  dayNameCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  dayNameText: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.textSecondary,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.medium,
    marginVertical: 2,
  },
  selectedDayCell: {
    backgroundColor: theme.colors.primary,
  },
  disabledDayCell: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.text,
    fontWeight: theme.fonts.weights.medium,
  },
  selectedDayText: {
    color: theme.colors.surface,
    fontWeight: theme.fonts.weights.semibold,
  },
  disabledDayText: {
    color: theme.colors.textLight,
  },
  helperContainer: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  helperText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
  },
});

export default CalendarPicker;
