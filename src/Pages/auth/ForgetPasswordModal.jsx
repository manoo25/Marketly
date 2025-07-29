import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import {
    sendOtpToEmail,
    verifyOtp,
    updatePassword,
} from "../../Supabase/ForgetPassword";
import { AiOutlineClose } from "react-icons/ai";

const ForgotPasswordModal = ({ show, handleClose }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // ✅ مؤقت إعادة الإرسال
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setTimeout(() => {
                setResendCooldown(resendCooldown - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    // ✅ إعادة تعيين الحالة كاملة
    const resetFormState = () => {
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setSuccessMessage("");
        setResendCooldown(0);
    };

    const handleCloseAndReset = () => {
        resetFormState();
        handleClose();
    };

    const handleSendOtp = async () => {
        setError("");
        const res = await sendOtpToEmail(email);
        if (res.success) {
            setSuccessMessage(res.message);
            setStep(2);
            setResendCooldown(60); // ⏱️ 15 ثانية قبل السماح بإعادة الإرسال
        } else {
            setError(res.message || "حدث خطأ أثناء إرسال الكود.");
        }
    };

    const [session, setSession] = useState(null);
    session;

    const handleVerifyOtp = async () => {
        setError("");
        const res = await verifyOtp(email, otp);
        if (res.success) {
            setSession(res.session); // مهم جداً!
            setSuccessMessage(res.message);
            setStep(3);
        } else {
            setError(res.message || "كود غير صحيح.");
        }
    };

    const handleResetPassword = async () => {
        setError("");
        if (newPassword !== confirmPassword) {
            return setError("كلمات المرور غير متطابقة.");
        }

        const res = await updatePassword(email, newPassword);

        if (res.success) {
            setSuccessMessage("تم تحديث كلمة المرور بنجاح. يمكنك تسجيل الدخول الآن.");
            setTimeout(() => {
                handleCloseAndReset();
            }, 2000);
        } else {
            setError(res.error || "فشل في تحديث كلمة المرور.");
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Form.Group>
                            <Form.Label>البريد الإلكتروني</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="ادخل بريدك الإلكتروني"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mt-3" onClick={handleSendOtp}>
                            إرسال الكود
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <Form.Group>
                            <Form.Label>أدخل الكود</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="أدخل الكود الذي تم إرساله لبريدك"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mt-3" onClick={handleVerifyOtp}>
                            التالي
                        </Button>

                        {/* زر إعادة الإرسال */}
                        <Button
                            variant="link"
                            className="mt-2"
                            onClick={handleSendOtp}
                            style={{ textDecoration: "none", color: "#007bff" }}
                            disabled={resendCooldown > 0}
                        >
                            {resendCooldown > 0
                                ? `يمكنك إعادة الإرسال خلال ${resendCooldown} ثانية`
                                : "إعادة إرسال الكود"}
                        </Button>
                    </>
                );
            case 3:
                return (
                    <>
                        <Form.Group>
                            <Form.Label>كلمة المرور الجديدة</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="أدخل كلمة المرور الجديدة"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>تأكيد كلمة المرور</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="أعد إدخال كلمة المرور"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mt-3" onClick={handleResetPassword}>
                            تحديث كلمة المرور
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Modal show={show} onHide={handleCloseAndReset} centered>
            <Modal.Header className="justify-content-between align-items-center" dir="rtl">
                <Modal.Title>إعادة تعيين كلمة المرور</Modal.Title>
                <Button
                    variant="link"
                    onClick={handleCloseAndReset}
                    style={{ fontSize: '1.5rem', color: 'black', textDecoration: 'none' }}
                    aria-label="Close"
                >
                    <AiOutlineClose size={24} style={{ color: "black" }} />
                </Button>
            </Modal.Header>

            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <Form>{renderStep()}</Form>
            </Modal.Body>
        </Modal>
    );
};

export default ForgotPasswordModal;
