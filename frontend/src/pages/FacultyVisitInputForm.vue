<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const firstname = ref('');
const lastname = ref('');
const facultyid = ref('');
const phone = ref('');
const mailid = ref('');
const event = ref('');
const typeevent = ref('');
const eventDate = ref('');
const eventLocation = ref('');
const eventOrganizer = ref('');
const isEditing = ref(false);
const loading = ref(false);

const router = useRouter();
const route = useRoute();

const fetchVisitData = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/faculty-visits/${id}`);
        const visit = await response.json();

        firstname.value = visit.firstname;
        lastname.value = visit.lastname;
        facultyid.value = visit.facultyid;
        phone.value = visit.phone;
        mailid.value = visit.mailid;
        event.value = visit.event;
        typeevent.value = visit.typeevent;
        eventDate.value = visit.eventDate.split('T')[0]; // Format to yyyy-MM-dd
        eventLocation.value = visit.eventLocation;
        eventOrganizer.value = visit.eventOrganizer;
    } catch (error) {
        console.error('Error fetching visit data:', error);
    }
};

const submitForm = async () => {
    loading.value = true; // Show loading indicator
    try {
        // Prepare the form data
        const formData = {
            firstname: firstname.value,
            lastname: lastname.value,
            facultyid: facultyid.value,
            phone: phone.value,
            mailid: mailid.value,
            event: event.value,
            typeevent: typeevent.value,
            eventDate: eventDate.value, // Make sure this is in the correct format
            eventLocation: eventLocation.value,
            eventOrganizer: eventOrganizer.value,
        };

        console.log('Form data being sent:', formData); // Log the form data

        const url = isEditing.value
            ? `http://localhost:3000/api/faculty-visits/${route.params.id}`
            : 'http://localhost:3000/api/faculty-visits';

        const response = await fetch(url, {
            method: isEditing.value ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        // Check if the response is ok
        if (!response.ok) {
            const errorResponse = await response.json(); // Parse the error response
            console.error('Error details:', errorResponse); // Log the error details
            throw new Error(errorResponse.message || 'Failed to submit form');
        }

        // If successful, display success message and redirect
        alert('Visit submitted successfully!');
        router.push('/dashboard/faculty-visit');
    } catch (error) {
        console.error('Failed to submit form:', error);
        alert(`Error: ${error.message}`); // Show specific error message
    } finally {
        loading.value = false; // Hide loading indicator
    }
};

onMounted(() => {
    if (route.params.id) {
        isEditing.value = true;
        fetchVisitData(route.params.id);
    }
});
</script>
