import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadVolunteeringProgram } from '../store/actions/volunteeringProgramAction';
import { saveVolunteer } from '../store/actions/volunteerActions';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
// import { UploadVolunteerFilesButton } from './UploadButton';

const NewVolunteerModal = (props) => {

  const dispatch = useDispatch();

  
  const { volunteeringProgram } = useSelector((state) => state.volunteeringProgramReducer);
  const associatedPrograms = volunteeringProgram; //  array,  from the back end
  
  // const volunteer2edit =props.data
  // ======= set the volunteer as blank or as Editone ======//
  const [newVolunteer, setNewVolunteer] = useState({
      'taz':'',
      'volunteeringProgram': '',
      'firstName': '',
      'lastName': '',
      'cellphone': '',
      'city': '',
      'email': '',
      'gender': '',
      'summary': '',
      'volunteerType': '',
      'status': '',
      'files': [],

      'talkSummary':'',
      'maslul':'',
      'milgaName':'',
      'officerName':'',
      'officerPhone':'',
      'hasDrivingLicence':'',
      'availableInEmergency':'',
      'educationPlace':'',
      'address':''


  });

        // 'volunteeringProgram_name': '',
      // 'volunteeringProgram_id': '',

  useEffect(() => {
   if (props.modalStatus === 'Edit') { 

    setNewVolunteer({
      'taz':  props.data['taz'],
      'volunteeringProgram': '',
      'firstName': props.data['firstName'],
      'lastName': props.data['lastName'],
      'cellphone': props.data['cellphone'],
      'city': props.data['city'],
      'email': props.data['email'],
      'gender': props.data['gender'],
      'summary': props.data['summary'],
      'volunteerType': props.data['volunteerType'],
      'status': props.data['status'],
      'files': [],
      // 'volunteeringProgram_name': associatedPrograms[props.data][volunteeringProgram][0],
      //  'volunteeringProgram_id': associatedPrograms[props.data][volunteeringProgram][0]
      'talkSummary':'',
      // 'studentOption':'',
      // 'milgaName':'',
      // 'kzinaName':'',
      // 'kzinaphone':





    })

    let originalEditdata = props.data
  }

}, [])
  // in case we cant update and we want to return the edit field to contain the original data




  console.log('open status', props.modalStatus)
  console.log('to edit', props.data)
  console.log('newVolunteer', newVolunteer)
  // console.log('volunteeringProgram', props.data['volunteeringProgram'][0])

//   var result = associatedPrograms.filter(function(d) {
//     return d._id ===  props.data['volunteeringProgram'][0]
// })

// console.log('associatedPrograms_name', result[0]['name'])

  //===================================================




  const [isOption2, setIsOption2] = useState(false);
  const [isOption3, setIsOption3] = useState(false);
  const [enable, setEnable] = useState(true);


  useEffect(() => {
    dispatch(loadVolunteeringProgram());
  }, [dispatch]);


  console.log('associatedPrograms', associatedPrograms)

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type === 'file') {
      value = e.target.files;
      console.log('e.target.value', e.target.files);
    }
    setNewVolunteer((prev) => ({ ...prev, [e.target.name]: value }));

    if (e.target.name === 'volunteeringProgram')
      return setNewVolunteer((prev) => ({ ...prev, volunteeringProgram: value }));

    if (e.target.name === 'volunteerType') {
      switch (e.target.value) {
        case 'עצמאי':
          setIsOption2(false);
          setIsOption3(false);
          break;
        case 'null':
          setIsOption2(false);
          setIsOption3(false);
          break;
        case 'סטודנט':
          setIsOption2(true);
          setIsOption3(false);
          break;
        case 'שלצ':
          setIsOption2(false);
          setIsOption3(true);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewVolunteer(newVolunteer);
    console.log('newVolunteer after',newVolunteer);
    dispatch(saveVolunteer(newVolunteer));
    props.setOpen(false);
  };


  const handleChangeProgram=(e)=>{
    const selectedIndex = e.target.options.selectedIndex;
    console.log('bla bla',e.target.options[selectedIndex].value)
    // const keySelected=e.target.options[selectedIndex].getAttribute('data-key')
    // setNewVolunteer({...newVolunteer, volunteeringProgram: e.target.value})
  }

  return (
    <>
      <Modal open={props.open} onClose={() => props.setOpen(false)}>
        <Box className="new_vol_modal">
          <button className="new_vol_close-button" onClick={() => props.setOpen(false)} type="button" />
          <h1 className="new_vol_title">רישום מתנדב חדש</h1>
          <div className="new_vol_modal_content">

            <form className="new_vol_modal_form" onSubmit={handleSubmit}>
              <div className="right">

                <label htmlFor="firstName" className="new_vol_modal_label">שם פרטי*    </label>
                <input
                  className="input"
                  type="text"
                  id="firstName"
                  name="firstName"
                  pattern=".{2,}"
                  value={newVolunteer.firstName}
                  title="אנא הזן שם פרטי"
                  required
                  onChange={(e)=>setNewVolunteer({...newVolunteer, firstName: e.target.value})}
                />

                <label htmlFor="lastName" className="new_vol_modal_label">  שם משפחה*  </label>
                <input
                  className="input"
                  type="text"
                  id="lastName"
                  name="lastName"
                  pattern=".{2,}"
                  value={newVolunteer.lastName}
                  title="אנא הזן שם משפחה"
                  required
                  onChange={(e)=>setNewVolunteer({...newVolunteer, lastName: e.target.value})}
                />

                <label htmlFor="taz" className="new_vol_modal_label"> ת.ז* </label>
                <input
                  className="input"
                  type="text"
                  id="taz"
                  name="taz"
                  pattern=".{9}"
                  value={newVolunteer.taz}
                  title="אנא הזן תעודת זהות תקינה"
                  required
                  onChange={(e)=>setNewVolunteer({...newVolunteer, taz: e.target.value})}
                />


                <label htmlFor="cellphone" className="new_vol_modal_label">טלפון* </label>
                <input
                  className="input"
                  type="text"
                  id="cellphone"
                  name="cellphone"
                  pattern="05?[0-9]-?[0-9]{7}"
                  value={newVolunteer.cellphone}
                  title="אנא הזן מספר סלולרי תקין"
                  required
                  onChange={(e)=>setNewVolunteer({...newVolunteer, cellphone: e.target.value})}
                />


                <label htmlFor="email" className="new_vol_modal_label">מייל* </label>
                <input
                  className="input new_vol_modal_input_mail "
                  type="email"
                  id="email"
                  name="email"
                  value={newVolunteer.email}
                  title="אנא הזן כתובת מייל תקינה"
                  required
                  onChange={(e)=>setNewVolunteer({...newVolunteer, email: e.target.value})}
                />


              </div>
              <div className="center">
                <label htmlFor="city" className="new_vol_modal_label"> עיר מגורים*  </label>
                <input
                  className="input"
                  type="text"
                  id="city"
                  name="city"
                  pattern=".{2,}"
                  value={newVolunteer.city}
                  title="אנא הזן עיר"
                  required
                  onChange={(e)=>setNewVolunteer({...newVolunteer, city: e.target.value})}
                />

                
                <label className="new_vol_modal_label">לשון פניה</label>
                <div className="gender_group"  >
                  <span className="gender_btns">
                    <input type="radio" value="זכר" name="gender" checked={newVolunteer.gender === 'זכר'} onChange={(e)=>setNewVolunteer({...newVolunteer, gender: e.target.value})}/>
                    <label htmlFor="male">זכר</label>
                  </span>
                  <span className="gender_btns">
                  <input type="radio" value="נקבה" name="gender" checked={newVolunteer.gender === 'נקבה'} onChange={(e)=>setNewVolunteer({...newVolunteer, gender: e.target.value})}/>
                    <label htmlFor="female">נקבה</label>
                  </span>
                  <span className="gender_btns">
                  <input type="radio" value="אחר" name="gender" checked={newVolunteer.gender === 'אחר'} onChange={(e)=>setNewVolunteer({...newVolunteer, gender: e.target.value})}/>
                    <label htmlFor="other">אחר</label>
                  </span>
                </div>


                <label className="new_vol_modal_label">סיכום שיחה</label>
                <TextareaAutosize type="text" name="summary" className="summary_text" onChange={(e)=>setNewVolunteer({...newVolunteer, talkSummary: e.target.value})} />
              </div>
 

              <div className="left">
                {/* <div> 
                  <>

                    <label className="new_vol_modal_label">בחר מסגרת התנדבות</label>
                    <select name="volunteeringProgram" className="input" onChange={handleChangeProgram}>
                      {associatedPrograms?.map((program, idx) => (
                        <option value={program._id} key={idx}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                  </>

                  <label className="new_vol_modal_label">בחר מסגרת מפנה</label>
                  <select name="volunteerType" className="input" onChange={handleChange}>
                    <option id="0" value="null">
                      בחר מסגרת מפנה
                    </option>
                    <option id="1" value="עצמאי">
                      עצמאי
                    </option>
                    <option id="2" value="סטודנט">
                      סטודנט
                    </option>
                    <option id="3" value="שלצ">
                      של"צ
                    </option>
                  </select>
                  {isOption2 && (
                    <>
                      <div className="student_group" onChange={handleChange}>
                        <span className="student_btns">
                          <input type="checkbox" value="נקז" name="student" />
                          <label htmlFor="nakaz">נק"ז</label>
                        </span>
                        <span className="student_btns">
                          <input type="checkbox" value="מלגה" name="student" />
                          <label htmlFor="milga">מלגה</label>
                        </span>
                      </div>
                      <label className="new_vol_modal_label">שם המלגה</label>
                      <input className="input" type="text" name="milgaName" required onChange={handleChange} />
                    </>
                  )}
                  {isOption3 && (
                    <>
                      <label className="new_vol_modal_label">שם קצינת מבחן</label>
                      <input className="input" type="text" name="kzinaName" required onChange={handleChange} />
                      <label className="new_vol_modal_label">טלפון קצינת מבחן</label>
                      <input className="input" type="text" name="kzinaPhone" required onChange={handleChange} />
                    </>
                  )}
                 

                </div> */}
                <Button
                  variant="contained"
                  type="submit"
                  className={enable ? 'new_vol_modal_btn' : 'new_vol_modal_btn disable'}
                >
                 {props.modalStatus === 'New'?' הוסף למסגרת': 'עדכן מתנדב'}
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default NewVolunteerModal;
