async function testModal() {
    console.log("Testing Modal API...");
    try {
        const res = await fetch("https://api.us-west-2.modal.direct/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer modalresearch_s5oJbURj_lmuqJ16yT5erCm8IinhQEBAU1q_mtzDgoM"
            },
            body: JSON.stringify({
                model: "zai-org/GLM-5-FP8",
                messages: [{ role: "user", content: "Hello" }],
                max_tokens: 10
            })
        });

        console.log("Status:", res.status, res.statusText);
        const data = await res.text();
        console.log("Response:", data);
    } catch (err) {
        console.error("Error:", err);
    }
}

testModal();
