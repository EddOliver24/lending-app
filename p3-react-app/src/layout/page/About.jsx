import BackButton from "../../component/BackButton";

const About = () => {
  return (
    <>
      <h1 className="intro-message text-secondary-100">About</h1>
      <h1 className="intro-message mb-4">
        This project is inspired by the concept of small-scale lending
        businesses which aim to benefit both the lender and the borrower. We
        believe in providing economically payable interest rates and flexible
        payment options. With our simple monthly interest computation and loan
        durations ranging from 1 month to 3 months, we strive to make borrowing
        and lending accessible and convenient for everyone.
      </h1>

      <BackButton />
    </>
  );
};

export default About;
