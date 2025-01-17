import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../../constants/fonts";
import { useNavigation, useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import { login, register } from "../../../data/api/authApi";
import { useAuth } from "../../context/AuthContext";
import { getCheckCustomerDetails } from "../../../data/api/getApi";

export default function SignUp() {
  const { userDetails, fetchUserDetails } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClear = () => {
    setPhoneNumber("");
    setUsername("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setPassword("");
    setIsChecked(false);
  };
  const validateFields = () => {
    const newErrors = {};

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!firstname) {
      newErrors.firstname = "First name is required";
    }

    if (!lastname) {
      newErrors.lastname = "Last name is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };
  const handleInputChange = (field) => (value) => {
    // Update state based on the field
    switch (field) {
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "firstname":
        setFirstName(value);
        break;
      case "middlename":
        setMiddleName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }

    // Clear errors related to the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSignup = async () => {
    // Validate fields and update error state
    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (!isChecked) {
        Alert.alert(
          "Attention",
          "You must agree to the terms before signing up."
        );
        return;
      }

      const data = {
        mobile_number: phoneNumber,
        email: email,
        username: username,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        password: password,
        isAgreement: isChecked,
      };

      setLoading(true);

      try {
        const response = await register(data);

        if (response.success) {
          const login_response = await login({
            username: username,
            password: password,
          });

          await AsyncStorage.setItem("accessToken", login_response.accessToken);

          await fetchUserDetails(login_response.accessToken);

          // console.log(login_response.accessToken);

          // if (userDetails.user_type === "Customer") {
          //   const details = await getCheckCustomerDetails(userDetails.userId);

          //   console.log(details);

          //   if (details.success !== false) {
          //     const { storeIdIsNull, addressIdIsNull } = details;

          //     if (storeIdIsNull || addressIdIsNull) {
          //       console.log(1);
          //       // router.push("/auth/complete/complete");
          //     } else {
          //       console.log(2);
          //       // router.push("/(customer)/home");
          //     }
          //   }
          // } else {
          //   console.log(3);
          //   // router.push("/(staff)/pickup");
          // }
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: response.message,
          }));
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  // useEffect(() => {
  //   if (userDetails.user_type) {
  //     if (userDetails.user_type === "Customer") {
  //       const fetchDetails = async () => {
  //         const details = await getCheckCustomerDetails(userDetails.userId);
  //         if (details.success !== false) {
  //           const { storeIdIsNull, addressIdIsNull } = details.data;
  //           if (storeIdIsNull || addressIdIsNull) {
  //             router.push("/auth/complete/address");
  //           } else {
  //             router.push("/(customer)/home");
  //           }
  //         } else {
  //           console.log(details);
  //         }
  //       };
  //       fetchDetails();
  //     } else {
  //       router.push("/(staff)/pickup");
  //     }
  //   }
  // }, [userDetails]);

  const handleTermAndConditons = () => {
    navigation.navigate("auth/term/term", {});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                marginTop: 15,
                fontSize: 22,
                fontFamily: fonts.Bold,
                marginVertical: 12,
                color: COLORS.primary,
              }}
            >
              Create an Account
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: fonts.Regular,
                color: COLORS.primary,
              }}
            >
              Fast and easy laundry service at hand!
            </Text>
          </View>

          {/* MOBILE NUMBER */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
              }}
            >
              Mobile Number
            </Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: errors.phoneNumber ? COLORS.error : COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="+63"
                placeholderTextColor={COLORS.primary}
                editable={false}
                style={{
                  width: "12%",
                  borderRightWidth: 1,
                  borderRightColor: errors.phoneNumber
                    ? COLORS.error
                    : COLORS.primary,
                  height: "100%",
                  fontFamily: fonts.Medium,
                }}
              />
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.grey}
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={handleInputChange("phoneNumber")}
                style={{ width: "80%", fontFamily: fonts.Regular }}
              />
            </View>
            {errors.phoneNumber && (
              <Text
                style={{
                  color: COLORS.error,
                  fontFamily: fonts.Regular,
                  fontSize: 12,
                  marginTop: 4,
                  marginStart: 10,
                }}
              >
                {errors.phoneNumber}
              </Text>
            )}
          </View>

          {/* Email */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
              }}
            >
              Email
            </Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: errors.email ? COLORS.error : COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.grey}
                keyboardType="default"
                value={email}
                onChangeText={handleInputChange("email")}
                style={{ width: "100%", fontFamily: fonts.Regular }}
              />
            </View>
            {errors.email && (
              <Text
                style={{
                  fontFamily: fonts.Regular,
                  color: COLORS.error,
                  fontSize: 12,
                  marginTop: 4,
                  marginStart: 10,
                }}
              >
                {errors.email}
              </Text>
            )}
          </View>

          {/* First name */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
              }}
            >
              Firstname
            </Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: errors.firstname ? COLORS.error : COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your first name"
                placeholderTextColor={COLORS.grey}
                keyboardType="default"
                value={firstname}
                onChangeText={handleInputChange("firstname")}
                style={{ width: "100%", fontFamily: fonts.Regular }}
              />
            </View>
            {errors.firstname && (
              <Text
                style={{
                  fontFamily: fonts.Regular,
                  color: COLORS.error,
                  fontSize: 12,
                  marginTop: 4,
                  marginStart: 10,
                }}
              >
                {errors.firstname}
              </Text>
            )}
          </View>

          {/* Middle name */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
              }}
            >
              Middlename
            </Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your middle name (if applicable)"
                placeholderTextColor={COLORS.grey}
                keyboardType="default"
                value={middlename}
                onChangeText={handleInputChange("middlename")}
                style={{ width: "100%", fontFamily: fonts.Regular }}
              />
            </View>
          </View>

          {/* Last name */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
              }}
            >
              Lastname
            </Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: errors.lastname ? COLORS.error : COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your lastname"
                placeholderTextColor={COLORS.grey}
                keyboardType="default"
                value={lastname}
                onChangeText={handleInputChange("lastname")}
                style={{ width: "100%", fontFamily: fonts.Regular }}
              />
            </View>
            {errors.lastname && (
              <Text
                style={{
                  fontFamily: fonts.Regular,
                  color: COLORS.error,
                  fontSize: 12,
                  marginTop: 4,
                  marginStart: 10,
                }}
              >
                {errors.lastname}
              </Text>
            )}
          </View>

          {/* Username */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
              }}
            >
              Username
            </Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: errors.username ? COLORS.error : COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your username"
                placeholderTextColor={COLORS.grey}
                keyboardType="default"
                value={username}
                onChangeText={handleInputChange("username")}
                style={{ width: "100%", fontFamily: fonts.Regular }}
              />
            </View>
            {errors.username && (
              <Text
                style={{
                  fontFamily: fonts.Regular,
                  color: COLORS.error,
                  fontSize: 12,
                  marginTop: 4,
                  marginStart: 10,
                }}
              >
                {errors.username}
              </Text>
            )}
          </View>

          {/* PASSWORD */}
          <View style={{ marginBottom: 15 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginVertical: 8,
                color: COLORS.primary,
              }}
            >
              Password
            </Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: errors.password ? COLORS.error : COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.grey}
                secureTextEntry={isPasswordShown}
                value={password}
                onChangeText={handleInputChange("password")}
                style={{ width: "100%", fontFamily: fonts.Regular }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{ position: "absolute", right: 12 }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.primary} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text
                style={{
                  fontFamily: fonts.Regular,
                  color: COLORS.error,
                  fontSize: 12,
                  marginTop: 4,
                  marginStart: 10,
                }}
              >
                {errors.password}
              </Text>
            )}
          </View>

          {/* Terms and Conditons */}
          <View style={{ marginBottom: 5 }}>
            <View style={{ flexDirection: "row", marginVertical: 6 }}>
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? COLORS.secondary : undefined}
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 13,
                  fontFamily: fonts.Regular,
                }}
              >
                I agree with terms the{" "}
              </Text>
              <TouchableOpacity onPress={handleTermAndConditons}>
                <Text
                  style={{
                    color: COLORS.secondary,
                    fontSize: 13,
                    fontFamily: fonts.Regular,
                  }}
                >
                  terms and conditions.{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            style={{
              backgroundColor: COLORS.secondary,
              borderRadius: 10,
              marginTop: 10,
              padding: 10,
              opacity: loading ? 0.7 : 1,
              height: 50,
              justifyContent: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.white} />
            ) : (
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 15,
                  fontFamily: fonts.Bold,
                  textAlign: "center",
                }}
              >
                Register
              </Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
              marginBottom: 20,
              gap: 2,
            }}
          >
            <Text style={{ color: COLORS.primary, fontFamily: fonts.Regular }}>
              Already have account?
            </Text>
            <TouchableOpacity onPress={() => router.navigate("/auth/sign-in")}>
              <Text
                style={{ color: COLORS.secondary, fontFamily: fonts.SemiBold }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
});
