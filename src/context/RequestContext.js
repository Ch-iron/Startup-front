import React, { useState, createContext } from 'react';

const RequestContext = createContext();

const RequestProvider = ({ children }) => {
    const [ordernum, setOrdernum] = useState('');
    const [stylist_id, setStylist_id] = useState(0);
    const [user_id_for_stylist, setUser_id_for_stylist] = useState(0);
    const [user_id, setUser_id] = useState(0);
    const [shopping_preference, setShopping_preference] = useState(0);
    const [shopping_effort, setShopping_effort] = useState(0);
    const [trend_sensitive, setTrend_sensitive] = useState(0);
    const [job, setJob] = useState('');
    const [working_fashion, setWorking_fashion] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [size_top, setSize_top] = useState(0);
    const [feeling_top, setFeeling_top] = useState(0);
    const [size_waist, setSize_waist] = useState(0);
    const [feeling_waist, setFeeling_waist] = useState(0);
    const [size_outer, setSize_outer] = useState(0);
    const [size_shoes, setSize_shoes] = useState(0);
    const [body_shape, setBody_shape] = useState(0);
    const [body_photo1, setBody_photo1] = useState('');
    const [body_photo2, setBody_photo2] = useState('');
    const [body_photo3, setBody_photo3] = useState('');
    const [body_image1, setBody_image1] = useState('');
    const [body_image2, setBody_image2] = useState('');
    const [body_image3, setBody_image3] = useState('');
    const [complex_top, setComplex_top] = useState('');
    const [complex_bottom, setComplex_bottom] = useState('');
    const [look_preference, setLook_preference] = useState([]);
    const [tpo, setTpo] = useState('');
    const [request_style1, setRequest_style1] = useState('');
    const [request_style2, setRequest_style2] = useState('');
    const [request_style3, setRequest_style3] = useState('');
    const [request_style, setRequest_style] = useState('');
    const [need_outer, setNeed_outer] = useState([]);
    const [need_top, setNeed_top] = useState([]);
    const [need_bottom, setNeed_bottom] = useState([]);
    const [need_shoes, setNeed_shoes] = useState([]);
    const [need_acc, setNeed_acc] = useState([]);
    const [wanted_fitting_top, setWanted_fitting_top] = useState([]);
    const [wanted_fitting_bottom, setWanted_fitting_bottom] = useState([]);
    const [budget_outer, setBudget_outer] = useState('');
    const [budget_top, setBudget_top] = useState('');
    const [budget_bottom, setBudget_bottom] = useState('');
    const [budget_shoes, setBudget_shoes] = useState('');
    const [budget_acc, setBudget_acc] = useState('');
    const [requirements, setRequirements] = useState('');

    const require = {
        survey: {
            shopping_preference, shopping_effort, trend_sensitive,
            job, working_fashion, height, weight,
            size_top, feeling_top, size_waist, feeling_waist, size_outer, size_shoes,
            body_shape, body_photo1, body_photo2, body_photo3,
            complex_top, complex_bottom, look_preference,
        },
        request: {
            ordernum, stylist_id, user_id_for_stylist, user_id,
            tpo, request_style1, request_style2, request_style3, need_outer, need_top, need_bottom, need_shoes, need_acc,
            wanted_fitting_top, wanted_fitting_bottom,
            budget_outer, budget_top, budget_bottom, budget_shoes, budget_acc, request_style, requirements,
        },
        photo: {
            body_image1, body_image2, body_image3,
        },
        actions: {
            setOrdernum, setStylist_id, setUser_id_for_stylist, setUser_id,
            setShopping_preference, setShopping_effort, setTrend_sensitive,
            setJob, setWorking_fashion, setHeight, setWeight,
            setSize_top, setFeeling_top, setSize_waist, setFeeling_waist, setSize_outer, setSize_shoes,
            setBody_shape, setBody_photo1, setBody_photo2, setBody_photo3, setBody_image1, setBody_image2, setBody_image3,
            setComplex_top, setComplex_bottom, setLook_preference,
            setTpo, setRequest_style1, setRequest_style2, setRequest_style3, setNeed_outer, setNeed_top, setNeed_bottom, setNeed_shoes, setNeed_acc,
            setWanted_fitting_top, setWanted_fitting_bottom,
            setBudget_outer, setBudget_top, setBudget_bottom, setBudget_shoes, setBudget_acc, setRequest_style, setRequirements,
        }
    }

    return (
        <RequestContext.Provider value={[require.survey, require.request, require.photo, require.actions]}>
            {children}
        </RequestContext.Provider>
    );
}

export { RequestContext, RequestProvider };