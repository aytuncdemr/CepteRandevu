import { Text, View } from "react-native";
import { Appointment } from "../interfaces/Appointment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faAppleAlt,
    faBusinessTime,
    faCalendarCheck,
    faCalendarDay,
    faUserTie,
    faCut,
    faSpa,
    faTeeth,
    faBrain,
    faStethoscope,
    faDumbbell,
    faCameraRetro,
    faGraduationCap,
    faCar,
    faWrench,
    faGavel,
    faChartBar,
    faHome,
    faBaby,
    faFan,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const categoryIcons: { [key: string]: IconDefinition } = {
    Kuaför: faCut,
    Berber: faCut,
    "Güzellik Salonu": faSpa,
    "Manikür / Pedikür / Nail Art": faSpa,
    "Cilt Bakımı Uzmanı": faSpa,
    "Masaj Salonu": faSpa,
    "Diş Hekimi": faTeeth,
    Ortodontist: faTeeth,
    Psikolog: faBrain,
    "Psikolojik Danışman": faBrain,
    Diyetisyen: faAppleAlt,
    Fizyoterapist: faStethoscope,
    "Pilates Eğitmeni": faDumbbell,
    "Yoga Eğitmeni": faDumbbell,
    "Fitness Salonu / PT": faDumbbell,
    "Kişisel Antrenör": faDumbbell,
    Veteriner: faStethoscope,
    "Hayvan Kuaförü": faCut,
    Fotoğrafçı: faCameraRetro,
    "Özel Ders Eğitmeni": faGraduationCap,
    "Müzik Öğretmeni": faGraduationCap,
    "Dans Kursu": faGraduationCap,
    "Sürücü Kursu": faCar,
    Çiçekçi: faFan,
    "Organizasyon Firması": faBusinessTime,
    "Düğün / Kına Salonu": faBusinessTime,
    "Kına / Nişan Organizasyonu": faBusinessTime,
    "Kreş / Anaokulu": faBaby,
    "Ev Temizlik Hizmeti": faHome,
    "Halı Yıkama": faHome,
    Çilingir: faWrench,
    Tesisatçı: faWrench,
    Elektrikçi: faWrench,
    "Boyacı / Usta": faWrench,
    "Kombi Servisi": faWrench,
    "Bilgisayar / Telefon Servisi": faWrench,
    "Araba Servisi": faCar,
    "Oto Yıkama": faCar,
    "Cam Filmi / Araç Kaplama": faCar,
    "Emlak Danışmanı": faHome,
    Avukat: faGavel,
    "Muhasebeci / Mali Müşavir": faChartBar,
    "Danışmanlık Hizmeti": faBusinessTime,
    "Moda Danışmanı": faBusinessTime,
    "İç Mimar": faHome,
    Tercüman: faBusinessTime,
    "Yaşam Koçu": faBrain,
    "Motivasyon Koçu": faBrain,
    "Logoped (Dil ve Konuşma Terapisti)": faBrain,
};

export default function Appointments({
    appointments,
    isCustomer,
}: {
    appointments: Appointment[];
    isCustomer: boolean;
}) {
    return (
        <View className="flex flex-col gap-4 px-4 mb-6">
            {appointments.map((appointment: Appointment) => {
                const icon: IconDefinition =
                    categoryIcons[appointment.category] || faCalendarCheck;

                return (
                    <View
                        className="relative border border-gray-200 p-4 rounded-lg"
                        key={appointment.id}
                    >
                        <View className="flex flex-col gap-1">
                            <View className="flex flex-row gap-4">
                                <View className="mb-2">
                                    <View className="bg-violet-200 flex items-center justify-center w-16 h-16 rounded-xl mx-auto">
                                        {isCustomer ?
                                            <FontAwesomeIcon
                                                size={32}
                                                color="#8b5cf6"
                                                icon={icon}
                                            /> : <FontAwesomeIcon
                                                size={32}
                                                color="#8b5cf6"
                                                icon={faUserCircle}
                                            />
                                        }
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-lg font-semibold text-gray-800">
                                        {isCustomer
                                            ? appointment.business
                                            : appointment.customer}
                                    </Text>
                                    <Text className="text-lg text-gray-400">
                                        {appointment.service.title}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex flex-row items-center gap-2">
                                <FontAwesomeIcon
                                    style={{ color: "rgb(255, 126, 42)" }}
                                    icon={faCalendarDay}
                                    size={18}
                                />
                                <Text className="text-lg text-gray-500">
                                    {appointment.date}
                                </Text>
                            </View>
                            <View
                                style={{ alignSelf: "flex-start" }}
                                className=" bg-orange-100 rounded-lg py-1 px-2 flex flex-row items-center gap-3 mt-2"
                            >
                                <FontAwesomeIcon
                                    color="#f97316"
                                    icon={faUserTie}
                                />
                                <Text className="text-lg text-orange-500 font-bold">
                                    {appointment.service.worker}
                                </Text>
                            </View>
                        </View>
                        <Text className="absolute bottom-2 right-2 text-lg text-gray-500">
                            {appointment.service.price}TL
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}
