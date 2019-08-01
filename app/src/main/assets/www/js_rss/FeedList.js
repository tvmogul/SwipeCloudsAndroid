(function () {

    var feedManager = FeedManager.getInstance();

    $(document).on("pageinit", "#listPage", function (e) {
        e.preventDefault();

        var urls = feedManager.getUrls();
        if (jQuery.isEmptyObject(urls)) {
            restoreDefaults();
            //$.mobile.changePage("#listPage");
        }
    });

    $(document).on("pageshow", "#listPage", function (e) {
        e.preventDefault();
        updateUrlList();
    });

    $(document).delegate('#listPage .rounded-img', 'click touchend', function (e, data) {
        event.preventDefault();
        event.stopPropagation();
        var zid = $(this).parents('[data-role=listview] li').data("id");
        if (zid == 'undefined') {
            event.stopPropagation();
        }
        else {
            localStorage["id_rssfeedcode"] = zid;
            GetFeeds();
            var urlID = localStorage["id_rssfeedcode"];
            var feedItem = new FeedItem("", "", "");
            if (urlID) {
                //Get feedItem from its ID.
                feedItem = feedManager.getUrlDetails(urlID);
            }
            var qrUrl = feedItem.url;
            if (qrUrl.indexOf("rsshandler.ashx") < 0) {
                $.mobile.changePage("#rssFeedPage");
            }
        }
    });

    $(document).delegate('li [data-icon="edit"]', 'click touchend', function (e, data) {
        event.preventDefault();
        //event.stopPropagation();
        var zid = $(this).parents('[data-role=listview] li').data("id");
        if (zid == 'undefined') {
            event.stopPropagation();
        }
        else {
            localStorage["id_rssfeedcode"] = zid;
            $.mobile.changePage("#addEditPage");
        }
    });

    $(document).delegate('#newPage', 'click touchend', function (e, data) {
        localStorage["id_rssfeedcode"] = "";
        $.mobile.changePage("#addEditPage");
        event.preventDefault();
        //event.stopPropagation();
    });


    // Bill SerGio: TODO: Make this more specific than just a delete icon !!!!
    $(document).delegate('li [data-icon="delete"]', 'click touchend', function (e, data) {
        event.preventDefault();
        //event.stopPropagation();
        var zid = $(this).parents('[data-role=listview] li').data("id");
        if (zid == 'undefined') {
            localStorage["id_rssfeedcode"] = "";
        }
        else {
            localStorage["id_rssfeedcode"] = zid;
            $.mobile.changePage("#deletePage");
        }
    });

    //    $(document).on("pagebeforeshow", "#rssFeedPage", function (e) {
    //        //$(document).on("pageshow", "#rssFeedPage", function (e) {
    //        e.preventDefault();

    //        //$('#feeditems-ul').trigger("create"); // *** THIS IS THE KEY ***
    //        //$('#feeditems-ul').listview('refresh');

    //        //GetFeeds();

    //        //$("#rssFeedPage").trigger("updatelayout");

    //    });

    $(document).on('click', '.ui-header a', function () {
        var el = $(this);
        var link = el.attr('href');
        if (link == "#from_article") {
            $.mobile.changePage("#rssFeedPage");
        }
        else if (link == "#movies") {
            //window.location = "./movies.html";
        }
    });



    $(document).on("pageinit", "#deletePage", function (e) {
        $("#removeAllUrls").on("tap", function () {
            e.preventDefault();
            feedManager.removeAllUrls();
            updateUrlList();
            $.mobile.changePage("#listPage");
        });

        $("#removeUrl").on("click touchend tap", function () {
            e.preventDefault();
            //var urlID = ($.mobile.pageData && $.mobile.pageData.urlID) ? $.mobile.pageData.urlID : null;
            var urlID = localStorage["id_rssfeedcode"];
            var feedItem = new FeedItem("", "", "");

            if (urlID) {
                //Update an existing url
                feedItem = feedManager.getUrlDetails(urlID);
            }

            feedManager.removeUrl(feedItem);
            updateUrlList();
            $.mobile.changePage("#listPage");
        });
    });

    $(document).on("pageinit", "#rssFeedPage", function (e) {

    });


    /////////////////////////////////////////////
    $(document).on("pageinit", "#addEditPage", function (e) {
        e.preventDefault();

        $("#saveUrl").on("tap", function () {
            e.preventDefault();

            var feedItem = new FeedItem($("#title").val() || "Untitled",
                                          $("#desc").val() || "",
                                          $("#url").val() || "",
                                          $("#vid").val() || null);

            feedManager.saveUrl(feedItem);
            $.mobile.changePage("#listPage");
        });

        $("#restoreDefaults").on("tap", function () {
            e.preventDefault();
            restoreDefaults();
            $.mobile.changePage("#listPage");
        });

    });

    $(document).on("pageshow", "#addEditPage", function (e) {
        e.preventDefault();

        //var urlID = ($.mobile.pageData && $.mobile.pageData.urlID) ? $.mobile.pageData.urlID : null;
        var urlID = localStorage["id_rssfeedcode"];
        var feedItem = new FeedItem("", "", "");

        if (urlID) {
            //Update an existing url
            feedItem = feedManager.getUrlDetails(urlID);
        }

        populateRecordingFields(feedItem);

        if (feedItem.location.length > 0) {
            $("#playUrl").closest('.ui-btn').show();
        } else {
            $("#playUrl").closest('.ui-btn').hide();
        }
    });

    $(document).on("pagebeforehide", "#addEditPage", function (e) {
        feedManager.cleanUpResources();
    });




    //url_prompt
    $(document).on("pageshow", "#deletePage", function (e) {
        e.preventDefault();

        //var urlID = ($.mobile.pageData && $.mobile.pageData.urlID) ? $.mobile.pageData.urlID : null;
        var urlID = localStorage["id_rssfeedcode"];
        var feedItem = new FeedItem("", "", "");

        if (urlID) {
            //Update an existing url
            feedItem = feedManager.getUrlDetails(urlID);
        }

        populateDeleteField(feedItem);

    });

    //FUNCS
    function GetFeeds() {
        var urlID = localStorage["id_rssfeedcode"];
        var feedItem = new FeedItem("", "", "");
        if (urlID) {
            //Get feedItem from its ID.
            feedItem = feedManager.getUrlDetails(urlID);
        }

        //Get the url we saved.
        var qrUrl = feedItem.url;

        //qrUrl = 'rsshandler.ashx?top=50&cat=music&methodName=topFeeds&jsonp=onRSSLoaded';
        if (qrUrl.indexOf("rsshandler.ashx") > -1) {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
            return;
        }

        if (qrUrl) {
            //$('#divrss').empty();
            $('.divrss').rssfetch(
			{
			    feed: qrUrl,
			    entries: 100,
			    header: false,
			    headerclass: 'myheader',
			    images: true,
			    fulltext: true,
			    loadingImg: 'images/loading.gif',
			    twitter: false,
			    facebook: false
			});
        }
        //$("#yt_player").attr("src", "");
        //$.mobile.changePage("rssmobi.html#rssFeedPage", {
        //    transition: "flip",
        //    reverse: 'true',
        //    changeHash: false
        //});
        $("#listFeedPage").trigger("updatelayout");

    }

    function restoreDefaults() {
        feedManager.removeAllUrls();
        var urls = feedManager.getUrls();
        //var arFeedItems = [];
        //arFeedItems.push(new FeedItem("feed1", "feed1", "http://www.fark.com/fark.rss"));
        //arFeedItems.push(new FeedItem("feed2", "feed2", "http://rss.slashdot.org/Slashdot/slashdot"));
        //arFeedItems.push(new FeedItem("feed3", "feed3", "http://www.reddit.com/.rss"));
        //arFeedItems.push(new FeedItem("feed3", "feed4", "http://digg.com/news.rss"));
        var arFeedItems = [
                new FeedItem("New Cool Stuff", "New Stuff, Breakthroughs, Things You Want", "http://www.sergioapps.com/Service.ashx?cat=music&start=0&max=49&methodName=topFeeds&jsonp=onRSSLoaded"),
                new FeedItem("Ivanhoe", "Ivanhoe Feed", "http://www.ivanhoe.com/rss/rss/headlines.xml"),
                new FeedItem("Yahoo News", "Yahoo News Feed", "http://news.yahoo.com/rss/"),
                new FeedItem("Flickr", "Flickr Feed", "http://www.flickr.com/services/feeds/photos_public.gne?tags=toy&format=rss_200"),
                new FeedItem("Yahoo Finance", "Yahoo Finance Feed", "http://finance.yahoo.com/rss/topfinstories"),
                new FeedItem("Goverment Jobs", "Goverment Jobs Feed", "https://www.usajobs.gov/JobSearch/Search/RSSFeed/104419"),
                new FeedItem("Goverment Jobs", "Goverment Jobs Feed", "https://www.usajobs.gov/JobSearch/Search/RSSFeed/104419"),
                new FeedItem("White House Videos", "White House Videos", "http://www.whitehouse.gov/podcast/video/white-house-features/rss.xml"),
                new FeedItem("White House Photos", "White House Photos", "http://www.whitehouse.gov/feed/media/photo-gallery"),
                new FeedItem("Goverment Health", "Goverment Health Feed", "http://www.govhealthit.com/most_popular/feed"),
                new FeedItem("White House", "White House Feed", "http://www.whitehouse.gov/feed/blog/white-house"),
            	new FeedItem("fark", "fark feed", "http://www.fark.com/fark.rss"),
		        new FeedItem("Slashdot", "Slashdot feed", "http://rss.slashdot.org/Slashdot/slashdot"),
		        new FeedItem("reddit", "reddit feed", "http://www.reddit.com/.rss"),
                new FeedItem("Jobs", "Jobs feed", "http://www.jobdig.com/jobs/South_Dakota/All_Job_Types/listing.xml"),
                new FeedItem("watchingthenet", "watchingthenet feed", "http://www.watchingthenet.com/feed"),
                new FeedItem("F.B.I.", "fbi feed", "http://www.fbi.gov/news/stories/all-stories/rss.xml"),
		        new FeedItem("digg", "digg news", "http://digg.com/news.rss"),
                new FeedItem("Abortion", "Medical", "http://www.medicalnewstoday.com/rss/abortion.xml"),
                new FeedItem("Acid Reflux / GERD", "Medical", "http://www.medicalnewstoday.com/rss/acidreflux-gerd.xml"),
                new FeedItem("ADHD", "Medical", "http://www.medicalnewstoday.com/rss/adhd.xml"),
                new FeedItem("Aid / Disasters", "Medical", "http://www.medicalnewstoday.com/rss/aid-disasters.xml"),
                new FeedItem("Alcohol / Addiction / Illegal Drugs", "Medical", "http://www.medicalnewstoday.com/rss/alcohol-addiction-illegal_drugs.xml"),
                new FeedItem("Allergy", "Medical", "http://www.medicalnewstoday.com/rss/allergy.xml"),
                new FeedItem("Alzheimer's / Dementia", "Medical", "http://www.medicalnewstoday.com/rss/alzheimers.xml"),
                new FeedItem("New Cool Stuff", "New Stuff, Breakthroughs, Things You Want", "http://www.sergioapps.com/Service.ashx?cat=new&start=0&max=49&methodName=topFeeds&jsonp=onRSSLoaded"),
                new FeedItem("Anxiety / Stress", "Medical", "http://www.medicalnewstoday.com/rss/anxiety.xml"),
                new FeedItem("Arthritis / Rheumatology", "Medical", "http://www.medicalnewstoday.com/rss/arthritis.xml"),
                new FeedItem("Asbestos / Mesothelioma", "Medical", "http://www.medicalnewstoday.com/rss/asbestos.xml"),
                new FeedItem("Autism", "Medical", "http://www.medicalnewstoday.com/rss/autism.xml"),
                new FeedItem("Back Pain", "Medical", "http://www.medicalnewstoday.com/rss/backpain.xml"),
                new FeedItem("Bio-terrorism / Terrorism", "Medical", "http://www.medicalnewstoday.com/rss/bioterrorism.xml"),
                new FeedItem("Biology / Biochemistry", "Medical", "http://www.medicalnewstoday.com/rss/biology-biochemistry.xml"),
                new FeedItem("Bipolar", "Medical", "http://www.medicalnewstoday.com/rss/bipolar.xml"),
                new FeedItem("Bird Flu / Avian Flu", "Medical", "http://www.medicalnewstoday.com/rss/birdflu-sars.xml"),
                new FeedItem("Blood / Hematology", "Medical", "http://www.medicalnewstoday.com/rss/blood.xml"),
                new FeedItem("Body Aches", "Medical", "http://www.medicalnewstoday.com/rss/bodyaches.xml"),
                new FeedItem("Bones / Orthopedics", "Medical", "http://www.medicalnewstoday.com/rss/bones-bone_disorders.xml"),
                new FeedItem("Breast Cancer", "Medical", "http://www.medicalnewstoday.com/rss/breastcancer.xml"),
                new FeedItem("Cancer / Oncology", "Medical", "http://www.medicalnewstoday.com/rss/cancer-oncology.xml"),
                new FeedItem("Cardiovascular / Cardiology", "Medical", "http://www.medicalnewstoday.com/rss/cardiovascular-cardiology.xml"),
                new FeedItem("Caregivers / Homecare", "Medical", "http://www.medicalnewstoday.com/rss/caregivers-homecare.xml"),
                new FeedItem("Cervical Cancer / HPV Vaccine", "Medical", "http://www.medicalnewstoday.com/rss/cervicalcancer.xml"),
                new FeedItem("Cholesterol", "Medical", "http://www.medicalnewstoday.com/rss/cholesterol.xml"),
                new FeedItem("CJD / vCJD / Mad Cow Disease", "Medical", "http://www.medicalnewstoday.com/rss/cjd-vcjd-mad_cow_disease.xml"),
                new FeedItem("New Cool Stuff", "New Stuff, Breakthroughs, Things You Want", "http://www.sergioapps.com/Service.ashx?cat=new&start=0&max=49&methodName=topFeeds&jsonp=onRSSLoaded"),
                new FeedItem("Cleft Palate", "Medical", "http://www.medicalnewstoday.com/rss/cleftpalate.xml"),
                new FeedItem("Clinical Trials / Drug Trials", "Medical", "http://www.medicalnewstoday.com/rss/clinicaltrials.xml"),
                new FeedItem("Colorectal Cancer", "Medical", "http://www.medicalnewstoday.com/rss/colorectal_cancer.xml"),
                new FeedItem("Complementary Medicine / Alternative Medicine", "Medical", "http://www.medicalnewstoday.com/rss/complementary_medicine.xml"),
                new FeedItem("Compliance", "Medical", "http://www.medicalnewstoday.com/rss/compliance.xml"),
                new FeedItem("Conferences", "Medical", "http://www.medicalnewstoday.com/rss/conferences.xml"),
                new FeedItem("COPD", "Medical", "http://www.medicalnewstoday.com/rss/copd.xml"),
                new FeedItem("Cosmetic Medicine / Plastic Surgery", "Medical", "http://www.medicalnewstoday.com/rss/cosmetic_medicine-plastic_surgery.xml"),
                new FeedItem("Crohn's / IBD", "Medical", "http://www.medicalnewstoday.com/rss/crohns.xml"),
                new FeedItem("Cystic Fibrosis", "Medical", "http://www.medicalnewstoday.com/rss/cystic_fibrosis.xml"),
                new FeedItem("Dentistry", "Medical", "http://www.medicalnewstoday.com/rss/dentistry.xml"),
                new FeedItem("Depression", "Medical", "http://www.medicalnewstoday.com/rss/depression.xml"),
                new FeedItem("Dermatology", "Medical", "http://www.medicalnewstoday.com/rss/dermatology.xml"),
                new FeedItem("Diabetes", "Medical", "http://www.medicalnewstoday.com/rss/diabetes.xml"),
                new FeedItem("Dyslexia", "Medical", "http://www.medicalnewstoday.com/rss/dyslexia.xml"),
                new FeedItem("Ear, Nose and Throat", "Medical", "http://www.medicalnewstoday.com/rss/ear_nose_and_throat.xml"),
                new FeedItem("Eating Disorders", "Medical", "http://www.medicalnewstoday.com/rss/eatingdisorders.xml"),
                new FeedItem("Eczema / Psoriasis", "Medical", "http://www.medicalnewstoday.com/rss/eczema-psoriasis.xml"),
                new FeedItem("Emergency Medicine", "Medical", "http://www.medicalnewstoday.com/rss/emergency-medicine.xml"),
                new FeedItem("Endocrinology", "Medical", "http://www.medicalnewstoday.com/rss/endocrinology.xml"),
                new FeedItem("Epilepsy", "Medical", "http://www.medicalnewstoday.com/rss/epilepsy.xml"),
                new FeedItem("Erectile Dysfunction / Premature Ejaculation", "Medical", "http://www.medicalnewstoday.com/rss/erectile_dysfunction-premature_ejaculation.xml"),
                new FeedItem("Eye Health / Blindness", "Medical", "http://www.medicalnewstoday.com/rss/eyehealth-ophthalmology.xml"),
                new FeedItem("Fertility", "Medical", "http://www.medicalnewstoday.com/rss/fertility.xml"),
                new FeedItem("Fibromyalgia", "Medical", "http://www.medicalnewstoday.com/rss/fibromyalgia.xml"),
                new FeedItem("Flu / Cold / SARS", "Medical", "http://www.medicalnewstoday.com/rss/flu-sars.xml"),
                new FeedItem("Food Intolerance", "Medical", "http://www.medicalnewstoday.com/rss/food-intolerance.xml"),
                new FeedItem("GastroIntestinal / Gastroenterology", "Medical", "http://www.medicalnewstoday.com/rss/gastrointestinal.xml"),
                new FeedItem("New Cool Stuff", "New Stuff, Breakthroughs, Things You Want", "http://www.sergioapps.com/Service.ashx?cat=new&start=0&max=49&methodName=topFeeds&jsonp=onRSSLoaded"),
                new FeedItem("Genetics", "Medical", "http://www.medicalnewstoday.com/rss/genetics.xml"),
                new FeedItem("Gout", "Medical", "http://www.medicalnewstoday.com/rss/gout.xml"),
                new FeedItem("Headache / Migraine", "Medical", "http://www.medicalnewstoday.com/rss/headache-migraine.xml"),
                new FeedItem("Health Insurance / Medical Insurance", "Medical", "http://www.medicalnewstoday.com/rss/healthinsurance.xml"),
                new FeedItem("Hearing / Deafness", "Medical", "http://www.medicalnewstoday.com/rss/hearing-deafness.xml"),
                new FeedItem("Heart Disease", "Medical", "http://www.medicalnewstoday.com/rss/heart-disease.xml"),
                new FeedItem("HIV / AIDS", "Medical", "http://www.medicalnewstoday.com/rss/hiv-aids.xml"),
                new FeedItem("Huntingtons Disease", "Medical", "http://www.medicalnewstoday.com/rss/huntingtons_disease.xml"),
                new FeedItem("Hypertension", "Medical", "http://www.medicalnewstoday.com/rss/hypertension.xml"),
                new FeedItem("Immune System / Vaccines", "Medical", "http://www.medicalnewstoday.com/rss/immune_system.xml"),
                new FeedItem("Infectious Diseases / Bacteria / Viruses", "Medical", "http://www.medicalnewstoday.com/rss/infectious_diseases-bacteria-viruses.xml"),
                new FeedItem("Irritable-Bowel Syndrome", "Medical", "http://www.medicalnewstoday.com/rss/irritable_bowel_syndrome.xml"),
                new FeedItem("IT / Internet / E-mail", "Medical", "http://www.medicalnewstoday.com/rss/it-internet-e-mail.xml"),
                new FeedItem("Litigation / Medical Malpractice", "Medical", "http://www.medicalnewstoday.com/rss/medicalmalpractice.xml"),
                new FeedItem("Liver Disease / Hepatitis", "Medical", "http://www.medicalnewstoday.com/rss/liver_disease-hepatitis.xml"),
                new FeedItem("Lung Cancer", "Medical", "http://www.medicalnewstoday.com/rss/lung_cancer.xml"),
                new FeedItem("New Cool Stuff", "New Stuff, Breakthroughs, Things You Want", "http://www.sergioapps.com/Service.ashx?cat=new&start=0&max=49&methodName=topFeeds&jsonp=onRSSLoaded"),
                new FeedItem("Lupus", "Medical", "http://www.medicalnewstoday.com/rss/lupus.xml"),
                new FeedItem("Lymphology/Lymphedema", "Medical", "http://www.medicalnewstoday.com/rss/lymphology.xml"),
                new FeedItem("Lymphoma / Leukemia / Myeloma", "Medical", "http://www.medicalnewstoday.com/rss/lymphoma-leukemia.xml"),
                new FeedItem("Medical Devices / Diagnostics", "Medical", "http://www.medicalnewstoday.com/rss/medical_devices.xml"),
                new FeedItem("Medical Innovation", "Medical", "http://www.medicalnewstoday.com/rss/medical-innovation.xml"),
                new FeedItem("Medical Practice Management", "Medical", "http://www.medicalnewstoday.com/rss/medical-practice-management.xml"),
                new FeedItem("Medical Students / Training", "Medical", "http://www.medicalnewstoday.com/rss/medical_students.xml"),
                new FeedItem("Medicare / Medicaid / SCHIP", "Medical", "http://www.medicalnewstoday.com/rss/medicare-medicaid.xml"),
                new FeedItem("Melanoma / Skin Cancer", "Medical", "http://www.medicalnewstoday.com/rss/melanoma.xml"),
                new FeedItem("Men's Health", "Medical", "http://www.medicalnewstoday.com/rss/mens_health.xml"),
                new FeedItem("Menopause", "Medical", "http://www.medicalnewstoday.com/rss/menopause.xml"),
                new FeedItem("Mental Health", "Medical", "http://www.medicalnewstoday.com/rss/mental_health.xml"),
                new FeedItem("MRI / PET / Ultrasound", "Medical", "http://www.medicalnewstoday.com/rss/mri-pet.xml"),
                new FeedItem("MRSA / Drug Resistance", "Medical", "http://www.medicalnewstoday.com/rss/mrsa-superbug.xml"),
                new FeedItem("Multiple Sclerosis", "Medical", "http://www.medicalnewstoday.com/rss/multiple_sclerosis.xml"),
                new FeedItem("Muscular Dystrophy / ALS", "Medical", "http://www.medicalnewstoday.com/rss/muscular_dystrophy.xml"),
                new FeedItem("Neurology / Neuroscience", "Medical", "http://www.medicalnewstoday.com/rss/neurology-neuroscience.xml"),
                new FeedItem("New Cool Stuff", "New Stuff, Breakthroughs, Things You Want", "http://www.sergioapps.com/Service.ashx?cat=new&start=0&max=49&methodName=topFeeds&jsonp=onRSSLoaded"),
                new FeedItem("Nursing / Midwifery", "Medical", "http://www.medicalnewstoday.com/rss/nursing.xml"),
                new FeedItem("Nutrition / Diet", "Medical", "http://www.medicalnewstoday.com/rss/nutrition-diet.xml"),
                new FeedItem("Obesity / Weight Loss / Fitness", "Medical", "http://www.medicalnewstoday.com/rss/fitness-obesity.xml"),
                new FeedItem("Ovarian Cancer", "Medical", "http://www.medicalnewstoday.com/rss/ovariancancer.xml"),
                new FeedItem("Pain / Anesthetics", "Medical", "http://www.medicalnewstoday.com/rss/pain.xml"),
                new FeedItem("Palliative Care / Hospice Care", "Medical", "http://www.medicalnewstoday.com/rss/palliative_care.xml"),
                new FeedItem("Pancreatic Cancer", "Medical", "http://www.medicalnewstoday.com/rss/pancreatic-cancer.xml"),
                new FeedItem("Parkinson's Disease", "Medical", "http://www.medicalnewstoday.com/rss/parkinsons_disease.xml"),
                new FeedItem("Pediatrics / Children's Health", "Medical", "http://www.medicalnewstoday.com/rss/pediatrics.xml"),
                new FeedItem("Pharma Industry / Biotech Industry", "Medical", "http://www.medicalnewstoday.com/rss/pharma_industry.xml"),
                new FeedItem("Pharmacy / Pharmacist", "Medical", "http://www.medicalnewstoday.com/rss/pharmacy.xml"),
                new FeedItem("Pregnancy / Obstetrics", "Medical", "http://www.medicalnewstoday.com/rss/pregnancy.xml"),
                new FeedItem("Preventive Medicine", "Medical", "http://www.medicalnewstoday.com/rss/preventive-medicine.xml"),
                new FeedItem("Primary Care / General Practice", "Medical", "http://www.medicalnewstoday.com/rss/primarycare.xml"),
                new FeedItem("Prostate / Prostate Cancer", "Medical", "http://www.medicalnewstoday.com/rss/prostate.xml"),
                new FeedItem("Psychology / Psychiatry", "Medical", "http://www.medicalnewstoday.com/rss/psychology-psychiatry.xml"),
                new FeedItem("Public Health", "Medical", "http://www.medicalnewstoday.com/rss/public_health.xml"),
                new FeedItem("Pulmonary System", "Medical", "http://www.medicalnewstoday.com/rss/pulmonary-system.xml"),
                new FeedItem("Radiology / Nuclear Medicine", "Medical", "http://www.medicalnewstoday.com/rss/radiology.xml"),
                new FeedItem("Regulatory Affairs / Drug Approvals", "Medical", "http://www.medicalnewstoday.com/rss/regulatoryaffairs.xml"),
                new FeedItem("New Cool Stuff", "New Stuff, Breakthroughs, Things You Want", "http://www.sergioapps.com/Service.ashx?cat=new&start=0&max=49&methodName=topFeeds&jsonp=onRSSLoaded"),
                new FeedItem("Rehabilitation / Physical Therapy", "Medical", "http://www.medicalnewstoday.com/rss/rehabilitation.xml"),
                new FeedItem("Respiratory / Asthma", "Medical", "http://www.medicalnewstoday.com/rss/asthma-respiratory.xml"),
                new FeedItem("Restless Legs Syndrome", "Medical", "http://www.medicalnewstoday.com/rss/restless-legs-syndrome.xml"),
                new FeedItem("Schizophrenia", "Medical", "http://www.medicalnewstoday.com/rss/schizophrenia.xml"),
                new FeedItem("Self-Monitoring", "Medical", "http://www.medicalnewstoday.com/rss/self-monitoring.xml"),
                new FeedItem("Seniors / Aging", "Medical", "http://www.medicalnewstoday.com/rss/seniors-aging.xml"),
                new FeedItem("Sexual Health / STDs", "Medical", "http://www.medicalnewstoday.com/rss/sexual_health-stds.xml"),
                new FeedItem("Sleep / Sleep Disorders / Insomnia", "Medical", "http://www.medicalnewstoday.com/rss/sleep-sleep_disorders.xml"),
                new FeedItem("Smoking / Quit Smoking", "Medical", "http://www.medicalnewstoday.com/rss/smoking.xml"),
                new FeedItem("New Cool Stuff", "New Stuff, Breakthroughs, Things You Want", "http://www.sergioapps.com/Service.ashx?cat=new&start=0&max=49&methodName=topFeeds&jsonp=onRSSLoaded"),
                new FeedItem("Sports Medicine / Fitness", "Medical", "http://www.medicalnewstoday.com/rss/sports_medicine.xml"),
                new FeedItem("Statins", "Medical", "http://www.medicalnewstoday.com/rss/statins.xml"),
                new FeedItem("Stem Cell Research", "Medical", "http://www.medicalnewstoday.com/rss/stem_cell_research.xml"),
                new FeedItem("Stroke", "Medical", "http://www.medicalnewstoday.com/rss/stroke.xml"),
                new FeedItem("Surgery", "Medical", "http://www.medicalnewstoday.com/rss/surgery.xml"),
                new FeedItem("Swine Flu", "Medical", "http://www.medicalnewstoday.com/rss/swine-flu.xml"),
                new FeedItem("Transplants / Organ Donations", "Medical", "http://www.medicalnewstoday.com/rss/transplants-organ_donations.xml"),
                new FeedItem("Tropical Diseases", "Medical", "http://www.medicalnewstoday.com/rss/tropical_diseases.xml"),
                new FeedItem("Tuberculosis", "Medical", "http://www.medicalnewstoday.com/rss/tuberculosis.xml"),
                new FeedItem("Urology / Nephrology", "Medical", "http://www.medicalnewstoday.com/rss/urology-nephrology.xml"),
                new FeedItem("Vascular", "Medical", "http://www.medicalnewstoday.com/rss/vascular.xml"),
                new FeedItem("Veterans / Ex-Servicemen", "Medical", "http://www.medicalnewstoday.com/rss/veterans.xml"),
                new FeedItem("Veterinary", "Medical", "http://www.medicalnewstoday.com/rss/veterinary.xml"),
                new FeedItem("Water - Air Quality / Agriculture", "Medical", "http://www.medicalnewstoday.com/rss/water_quality.xml"),
                new FeedItem("New Cool Stuff", "New Stuff, Breakthroughs, Things You Want", "http://www.sergioapps.com/Service.ashx?cat=new&start=0&max=49&methodName=topFeeds&jsonp=onRSSLoaded"),
                new FeedItem("Women's Health / Gynecology", "Medical", "http://www.medicalnewstoday.com/rss/womens_health-obgyn.xml")];
        feedManager.saveUrls(arFeedItems);
        //window.location.reload();
        //$.mobile.changePage("#listPage");
    }



    function updateUrlList() {
        // Get list of urls
        var urls = feedManager.getUrls();

        // Get the page we are going to write our content into.
        var $page = $("#listPage");

        // Get the content area element for the page.
        var $content = $page.children(":jqmData(role=content)");

        //container.empty(); $("#urlListView").empty();

        // Build the list of urls.
        var markup = '<nav data-iscroll=\'{"hScroll":false,"vScroll":true,"resizeEvents":"orientationchange","resizeWrapper":true}\' data-id="content" data-role="content">';
        markup += '<ul data-theme="a" id="rssfetch-ul" data-role="listview" data-inset="false" data-filter="false" style="padding-top:20px;padding-bottom:20px;">';
        //var markup = '';

        if (jQuery.isEmptyObject(urls)) {
            //$("<li>No URLs Available</li>").appendTo("#urlListView");
            restoreDefaults();
            //$.mobile.changePage("#listPage");
            urls = feedManager.getUrls();
        }

        for (var url in urls) {
            var _text = true;
            var image = './img/rss.png';

            markup += '<li data-id="' + urls[url].id + '">';
            //markup += '<a href="#" class="link_wrapper">';
            markup += '<img class="rounded-img" src="' + image + '" alt="." />';
            if (_text) {
                markup += '<div class="ellipsis" style="margin-top: 0px; !important;">' + urls[url].title + '</div>';
                markup += '<div class="ellipsis2">' + urls[url].desc + '</div>';
            }
            else {
                markup += '<div class="ellipsis" style="margin-top: 20px; !important;">' + urls[url].title + '</div>';
            }
            markup += '<div class="split-custom-wrapper"style="padding-top: 12px !important;position: fixed !important;z-index: 9999 !important;">';
            markup += '<a id="b_delete" data-corners="false" href="#" data-role="button" class="split-custom-button" data-icon="delete" data-theme="a" data-iconpos="notext"></a>';
            markup += '<a id="b_edit" data-corners="false" href="#" data-role="button" class="split-custom-button" data-icon="edit" data-theme="a" data-iconpos="notext"></a>';
            markup += '</div';
            markup += '</li>';
        }

        markup = markup + "</ul></nav>";

        // Inject the list markup into the content element.
        $content.html(markup);

        //WS needed for scrolling
        $content.parents('[data-role=page]').page('destroy').page();

        // Pages are lazily enhanced. We call page() on the page
        // element to make sure it is always enhanced before we
        // attempt to enhance the listview markup we just injected.
        $page.page();

        // Enhance the listview we just injected.
        $content.find(":jqmData(role=listview)").listview();

        // Now call changePage() and tell it to switch to the page we just modified.
        //$.mobile.changePage($page);

    }


    function populateRecordingFields(feedItem) {
        $("#vid").val(feedItem.id);
        $("#title").val(feedItem.title);
        $("#desc").val(feedItem.desc);
        $("#url").val(feedItem.url);
    }

    function populateDeleteField(feedItem) {
        $("#url_prompt").text(feedItem.title);
    }


    function LoadUpDefault() {

        var feedItem = new FeedItem("title", "desc", "url", "");

        feedManager.saveUrl(feedItem);
        $.mobile.changePage("#listPage");
    }


    var refreshIntervalId;
    function refreshListView() {
        refreshIntervalId = setTimeout("refreshListViewDelayed()", 100);
    }
    function refreshListViewDelayed() {
        clearInterval(refreshIntervalId);
        //$('#rsslistfetch-ul').listview('refresh');
        //$(".videowrapper").find(".iscroll-content").resizeWrapper();
    }


    // Find URL in the url list. Return index or -1 if not found.
    function findUrl(url) {
        var index = -1;
        var myUrls = getMyUrls();
        for (var i = 0; i < myUrls.length; i++) {
            if (myUrls[i] == encodeURIComponent(url)) {
                return i;
            }
        }
        return index;
    }

    // Add a URL to the list.
    function addUrl(url) {
        var myUrls = getMyUrls();
        // Check for duplicates
        if ((url == "http://") || (url == "")) {
        }
        else if (findUrl(url) == -1) {
            myUrls = myUrls.concat(encodeURIComponent(url));
            localStorage.setItem("myUrls", JSON.stringify(myUrls));
        }
        else {
            //alert("Link already in list!");
        }
    }


})();


//        var arFeedItems = [
//                new FeedItem("

//                new FeedItem("ACCESS_CHECKIN_PROPERTIES", "Allows read/write access to the "properties" table in the checkin database, to change values that get uploaded.
//                new FeedItem("ACCESS_COARSE_LOCATION", "Allows an app to access approximate location derived from network location sources such as cell towers and Wi-Fi.
//                new FeedItem("ACCESS_FINE_LOCATION", "Allows an app to access precise location from location sources such as GPS, cell towers, and Wi-Fi.
//                new FeedItem("ACCESS_LOCATION_EXTRA_COMMANDS", "Allows an application to access extra location provider commands
//                new FeedItem("ACCESS_MOCK_LOCATION", "Allows an application to create mock location providers for testing
//                new FeedItem("ACCESS_NETWORK_STATE", "Allows applications to access information about networks
//                new FeedItem("ACCESS_SURFACE_FLINGER", "Allows an application to use SurfaceFlinger's low level features.
//                new FeedItem("ACCESS_WIFI_STATE", "Allows applications to access information about Wi-Fi networks
//                new FeedItem("ACCOUNT_MANAGER", "Allows applications to call into AccountAuthenticators.
//                new FeedItem("ADD_VOICEMAIL", "Allows an application to add voicemails into the system.
//                new FeedItem("AUTHENTICATE_ACCOUNTS", "Allows an application to act as an AccountAuthenticator for the AccountManager
//                new FeedItem("BATTERY_STATS", "Allows an application to collect battery statistics
//                new FeedItem("BIND_ACCESSIBILITY_SERVICE", "Must be required by an AccessibilityService, to ensure that only the system can bind to it.
//                new FeedItem("BIND_APPWIDGET", "Allows an application to tell the AppWidget service which application can access AppWidget's data.
//                new FeedItem("BIND_DEVICE_ADMIN", "Must be required by device administration receiver, to ensure that only the system can interact with it.
//                new FeedItem("BIND_INPUT_METHOD	Must be required by an InputMethodService, to ensure that only the system can bind to it.
//                new FeedItem("BIND_NFC_SERVICE	Must be required by a HostApduService or OffHostApduService to ensure that only the system can bind to it.
//                new FeedItem("BIND_NOTIFICATION_LISTENER_SERVICE	Must be required by an NotificationListenerService, to ensure that only the system can bind to it.
//                new FeedItem("BIND_PRINT_SERVICE	Must be required by a PrintService, to ensure that only the system can bind to it.
//                new FeedItem("BIND_REMOTEVIEWS	Must be required by a RemoteViewsService, to ensure that only the system can bind to it.
//                new FeedItem("BIND_TEXT_SERVICE	Must be required by a TextService (e.g.
//                new FeedItem("BIND_VPN_SERVICE	Must be required by a VpnService, to ensure that only the system can bind to it.
//                new FeedItem("BIND_WALLPAPER	Must be required by a WallpaperService, to ensure that only the system can bind to it.
//                new FeedItem("BLUETOOTH	Allows applications to connect to paired bluetooth devices
//                new FeedItem("BLUETOOTH_ADMIN	Allows applications to discover and pair bluetooth devices
//                new FeedItem("BLUETOOTH_PRIVILEGED	Allows applications to pair bluetooth devices without user interaction.
//                new FeedItem("BODY_SENSORS	Allows an application to access data from sensors that the user uses to measure what is happening inside his/her body, such as heart rate.
//                new FeedItem("BRICK	Required to be able to disable the device (very dangerous!).
//                new FeedItem("BROADCAST_PACKAGE_REMOVED	Allows an application to broadcast a notification that an application package has been removed.
//                new FeedItem("BROADCAST_SMS	Allows an application to broadcast an SMS receipt notification.
//                new FeedItem("BROADCAST_STICKY	Allows an application to broadcast sticky intents.
//                new FeedItem("BROADCAST_WAP_PUSH	Allows an application to broadcast a WAP PUSH receipt notification.
//                new FeedItem("CALL_PHONE	Allows an application to initiate a phone call without going through the Dialer user interface for the user to confirm the call being placed.
//                new FeedItem("CALL_PRIVILEGED	Allows an application to call any phone number, including emergency numbers, without going through the Dialer user interface for the user to confirm the call being placed.
//                new FeedItem("CAMERA	Required to be able to access the camera device.
//                new FeedItem("CAPTURE_AUDIO_OUTPUT	Allows an application to capture audio output.
//                new FeedItem("CAPTURE_SECURE_VIDEO_OUTPUT	Allows an application to capture secure video output.
//                new FeedItem("CAPTURE_VIDEO_OUTPUT	Allows an application to capture video output.
//                new FeedItem("CHANGE_COMPONENT_ENABLED_STATE	Allows an application to change whether an application component (other than its own) is enabled or not.
//                new FeedItem("CHANGE_CONFIGURATION	Allows an application to modify the current configuration, such as locale.
//                new FeedItem("CHANGE_NETWORK_STATE	Allows applications to change network connectivity state
//                new FeedItem("CHANGE_WIFI_MULTICAST_STATE	Allows applications to enter Wi-Fi Multicast mode
//                new FeedItem("CHANGE_WIFI_STATE	Allows applications to change Wi-Fi connectivity state
//                new FeedItem("CLEAR_APP_CACHE	Allows an application to clear the caches of all installed applications on the device.
//                new FeedItem("CLEAR_APP_USER_DATA	Allows an application to clear user data.
//                new FeedItem("CONTROL_LOCATION_UPDATES	Allows enabling/disabling location update notifications from the radio.
//                new FeedItem("DELETE_CACHE_FILES	Allows an application to delete cache files.
//                new FeedItem("DELETE_PACKAGES	Allows an application to delete packages.
//                new FeedItem("DEVICE_POWER	Allows low-level access to power management.
//                new FeedItem("DIAGNOSTIC	Allows applications to RW to diagnostic resources.
//                new FeedItem("DISABLE_KEYGUARD	Allows applications to disable the keyguard
//                new FeedItem("DUMP	Allows an application to retrieve state dump information from system services.
//                new FeedItem("EXPAND_STATUS_BAR	Allows an application to expand or collapse the status bar.
//                new FeedItem("FACTORY_TEST	Run as a manufacturer test application, running as the root user.
//                new FeedItem("FLASHLIGHT	Allows access to the flashlight
//                new FeedItem("FORCE_BACK	Allows an application to force a BACK operation on whatever is the top activity.
//                new FeedItem("GET_ACCOUNTS	Allows access to the list of accounts in the Accounts Service
//                new FeedItem("GET_PACKAGE_SIZE	Allows an application to find out the space used by any package.
//                new FeedItem("GET_TASKS	Allows an application to get information about the currently or recently running tasks.
//                new FeedItem("GET_TOP_ACTIVITY_INFO	Allows an application to retrieve private information about the current top activity, such as any assist context it can provide.
//                new FeedItem("GLOBAL_SEARCH	This permission can be used on content providers to allow the global search system to access their data.
//                new FeedItem("HARDWARE_TEST	Allows access to hardware peripherals.
//                new FeedItem("INJECT_EVENTS	Allows an application to inject user events (keys, touch, trackball) into the event stream and deliver them to ANY window.
//                new FeedItem("INSTALL_LOCATION_PROVIDER	Allows an application to install a location provider into the Location Manager.
//                new FeedItem("INSTALL_PACKAGES	Allows an application to install packages.
//                new FeedItem("INSTALL_SHORTCUT	Allows an application to install a shortcut in Launcher
//                new FeedItem("INTERNAL_SYSTEM_WINDOW	Allows an application to open windows that are for use by parts of the system user interface.
//                new FeedItem("INTERNET	Allows applications to open network sockets.
//                new FeedItem("KILL_BACKGROUND_PROCESSES	Allows an application to call killBackgroundProcesses(String).
//                new FeedItem("LOCATION_HARDWARE	Allows an application to use location features in hardware, such as the geofencing api.
//                new FeedItem("MANAGE_ACCOUNTS	Allows an application to manage the list of accounts in the AccountManager
//                new FeedItem("MANAGE_APP_TOKENS	Allows an application to manage (create, destroy, Z-order) application tokens in the window manager.
//                new FeedItem("MANAGE_DOCUMENTS	Allows an application to manage access to documents, usually as part of a document picker.
//                new FeedItem("MASTER_CLEAR	Not for use by third-party applications.
//                new FeedItem("MEDIA_CONTENT_CONTROL	Allows an application to know what content is playing and control its playback.
//                new FeedItem("MODIFY_AUDIO_SETTINGS	Allows an application to modify global audio settings
//                new FeedItem("MODIFY_PHONE_STATE	Allows modification of the telephony state - power on, mmi, etc.
//                new FeedItem("MOUNT_FORMAT_FILESYSTEMS	Allows formatting file systems for removable storage.
//                new FeedItem("MOUNT_UNMOUNT_FILESYSTEMS	Allows mounting and unmounting file systems for removable storage.
//                new FeedItem("NFC	Allows applications to perform I/O operations over NFC
//                new FeedItem("PERSISTENT_ACTIVITY	This constant was deprecated in API level 9. This functionality will be removed in the future; please do not use. Allow an application to make its activities persistent.
//                new FeedItem("PROCESS_OUTGOING_CALLS	Allows an application to modify or abort outgoing calls.
//                new FeedItem("READ_CALENDAR	Allows an application to read the user's calendar data.
//                new FeedItem("READ_CALL_LOG	Allows an application to read the user's call log.
//                new FeedItem("READ_CONTACTS	Allows an application to read the user's contacts data.
//                new FeedItem("READ_EXTERNAL_STORAGE	Allows an application to read from external storage.
//                new FeedItem("READ_FRAME_BUFFER	Allows an application to take screen shots and more generally get access to the frame buffer data.
//                new FeedItem("READ_HISTORY_BOOKMARKS	Allows an application to read (but not write) the user's browsing history and bookmarks.
//                new FeedItem("READ_INPUT_STATE	This constant was deprecated in API level 16. The API that used this permission has been removed.
//                new FeedItem("READ_LOGS	Allows an application to read the low-level system log files.
//                new FeedItem("READ_PHONE_STATE	Allows read only access to phone state.
//                new FeedItem("READ_PROFILE	Allows an application to read the user's personal profile data.
//                new FeedItem("READ_SMS	Allows an application to read SMS messages.
//                new FeedItem("READ_SOCIAL_STREAM	Allows an application to read from the user's social stream.
//                new FeedItem("READ_SYNC_SETTINGS	Allows applications to read the sync settings
//                new FeedItem("READ_SYNC_STATS	Allows applications to read the sync stats
//                new FeedItem("READ_USER_DICTIONARY	Allows an application to read the user dictionary.
//                new FeedItem("REBOOT	Required to be able to reboot the device.
//                new FeedItem("RECEIVE_BOOT_COMPLETED	Allows an application to receive the ACTION_BOOT_COMPLETED that is broadcast after the system finishes booting.
//                new FeedItem("RECEIVE_MMS	Allows an application to monitor incoming MMS messages, to record or perform processing on them.
//                new FeedItem("RECEIVE_SMS	Allows an application to monitor incoming SMS messages, to record or perform processing on them.
//                new FeedItem("RECEIVE_WAP_PUSH	Allows an application to monitor incoming WAP push messages.
//                new FeedItem("RECORD_AUDIO	Allows an application to record audio
//                new FeedItem("REORDER_TASKS	Allows an application to change the Z-order of tasks
//                new FeedItem("RESTART_PACKAGES	This constant was deprecated in API level 8. The restartPackage(String) API is no longer supported.
//                new FeedItem("SEND_RESPOND_VIA_MESSAGE	Allows an application (Phone) to send a request to other applications to handle the respond-via-message action during incoming calls.
//                new FeedItem("SEND_SMS	Allows an application to send SMS messages.
//                new FeedItem("SET_ACTIVITY_WATCHER	Allows an application to watch and control how activities are started globally in the system.
//                new FeedItem("SET_ALARM	Allows an application to broadcast an Intent to set an alarm for the user.
//                new FeedItem("SET_ALWAYS_FINISH	Allows an application to control whether activities are immediately finished when put in the background.
//                new FeedItem("SET_ANIMATION_SCALE	Modify the global animation scaling factor.
//                new FeedItem("SET_DEBUG_APP	Configure an application for debugging.
//                new FeedItem("SET_ORIENTATION	Allows low-level access to setting the orientation (actually rotation) of the screen.
//                new FeedItem("SET_POINTER_SPEED	Allows low-level access to setting the pointer speed.
//                new FeedItem("SET_PREFERRED_APPLICATIONS	This constant was deprecated in API level 7. No longer useful, see addPackageToPreferred(String) for details.
//                new FeedItem("SET_PROCESS_LIMIT	Allows an application to set the maximum number of (not needed) application processes that can be running.
//                new FeedItem("SET_TIME	Allows applications to set the system time.
//                new FeedItem("SET_TIME_ZONE	Allows applications to set the system time zone
//                new FeedItem("SET_WALLPAPER	Allows applications to set the wallpaper
//                new FeedItem("SET_WALLPAPER_HINTS	Allows applications to set the wallpaper hints
//                new FeedItem("SIGNAL_PERSISTENT_PROCESSES	Allow an application to request that a signal be sent to all persistent processes.
//                new FeedItem("STATUS_BAR	Allows an application to open, close, or disable the status bar and its icons.
//                new FeedItem("SUBSCRIBED_FEEDS_READ	Allows an application to allow access the subscribed feeds ContentProvider.
//                new FeedItem("SUBSCRIBED_FEEDS_WRITE	
//                new FeedItem("SYSTEM_ALERT_WINDOW	Allows an application to open windows using the type TYPE_SYSTEM_ALERT, shown on top of all other applications.
//                new FeedItem("TRANSMIT_IR	Allows using the device's IR transmitter, if available
//                new FeedItem("UNINSTALL_SHORTCUT	Allows an application to uninstall a shortcut in Launcher
//                new FeedItem("UPDATE_DEVICE_STATS	Allows an application to update device statistics.
//                new FeedItem("USE_CREDENTIALS	Allows an application to request authtokens from the AccountManager
//                new FeedItem("USE_SIP	Allows an application to use SIP service
//                new FeedItem("VIBRATE	Allows access to the vibrator
//                new FeedItem("WAKE_LOCK	Allows using PowerManager WakeLocks to keep processor from sleeping or screen from dimming
//                new FeedItem("WRITE_APN_SETTINGS	Allows applications to write the apn settings.
//                new FeedItem("WRITE_CALENDAR	Allows an application to write (but not read) the user's calendar data.
//                new FeedItem("WRITE_CALL_LOG	Allows an application to write (but not read) the user's contacts data.
//                new FeedItem("WRITE_CONTACTS	Allows an application to write (but not read) the user's contacts data.
//                new FeedItem("WRITE_EXTERNAL_STORAGE	Allows an application to write to external storage.
//                new FeedItem("WRITE_GSERVICES	Allows an application to modify the Google service map.
//                new FeedItem("WRITE_HISTORY_BOOKMARKS	Allows an application to write (but not read) the user's browsing history and bookmarks.
//                new FeedItem("WRITE_PROFILE	Allows an application to write (but not read) the user's personal profile data.
//                new FeedItem("WRITE_SECURE_SETTINGS	Allows an application to read or write the secure system settings.
//                new FeedItem("WRITE_SETTINGS	Allows an application to read or write the system settings.
//                new FeedItem("WRITE_SMS	Allows an application to write SMS messages.
//                new FeedItem("WRITE_SOCIAL_STREAM	Allows an application to write (but not read) the user's social stream data.
//                new FeedItem("WRITE_SYNC_SETTINGS	Allows applications to write the sync settings
//                new FeedItem("WRITE_USER_DICTIONARY	Allows an application to write to the user dictionary.
