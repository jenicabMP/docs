---
title: Journeys
order: 10
---
<aside>Contact <a href="https://www.mparticle.com/contact/journeys">mParticle</a> to request participation in the Beta version of Journeys.</aside>

Use Journeys to move away from simple cross-channel engagement toward an organization-wide customer journey strategy. Journeys help you to perform journey analysis, testing, and orchestration in a single workflow:

* Your campaign needs to reach customers who are spread across many channels, or your customer data about them is coming in from many different sources.
* You want to use a visual tool to create your campaign.
* You want to define a series of audiences based on different criteria in order to take different actions as part of the same campaign.
* You want to drive consistent messaging across channels and prevent duplicate targeting.

Because customers interact with your brand in many different ways at many different times, you need to reach them based on their behaviors, and reach them with a cohesive voice to deliver a personalized experience across multiple marketing channels.

## Journeys basics

You want to design a multistep journey: starting with the users available with the inputs you select, you can apply sets of criteria called milestones. At each milestone a new audience is created, which you can then send downstream for further action.

You can create as many journeys as you need (up to your active audience limit), and delete empty journeys when they are no longer useful. You can also delete milestones and their related audiences and connections from a journey and add new milestones.

### Journey workflow

At the start of the journey, you have access to all the users available from all the inputs from all the workspaces in your account. You choose the workspaces and inputs you wish to select audience members from, and then build the journey:

1. In a series of steps called milestones, you break down all of the paths taken by your users within a customer lifecycle stage. For example, let's say that a user signs up for a trial account, interacts with free content, and then saves some content for later. Milestones define the steps that users take or that you want users to take to achieve a set of goals such as sign up, makes a purchase, or become a repeat customer.
2. Milestones generate audiences that you can forward to an integration to convert users from one step to the next in their journey. Following on the previous example, if you see a drop off between "sign up to trial account" and "watches content" milestones, you can activate the trial account audiences and send it to a CRM partner to send promo emails that help attract and bring content to non-engaged users.
3. Keep defining milestones until you've reached the final goal for the customer lifecycle stage. Using the previous example, the "converted to paid user" milestone is the the last milestone in the journey.
4. Verify that the data flow is behaving as you expect using the same tools and techniques you use for an integration.
5. When a journey needs to be changed, you can modify or delete milestones. 

The following diagram shows a simple journey: 

![image of a journey canvas with one milestone](/images/journeys/journey-sample1.png)

In this journey, all high-value customers are sent an email, and then all of the high-value customers who are also long-term customers are sent an SMS.

* The audience size is being estimated. The size after audience calculation is complete is displayed in the same location.
* Notice the branch symbol above each milestone. This symbol appears every time you create a milestone. Click it to create a remaining user split.

### Remaining user split

Each time you create a milestone, you have the option of creating a split milestone for all the users who don't meet that milestone criteria, called the remaining users split. 

For example, assume that your users can register their consent to receive email. You can create one milestone to send email to those users, and then create a reamining users split to send SMS to everyone else.

![img of a journey with one milestone and one remaining user milestone](/images/journeys/one-milestone.png)

This is an easy way to define actions for the full remainder of users who don't meet the criteria for a particular milestone.

### Remaining user split examples

The following three examples show the many different ways you can use a remaining user split in journeys.

#### Use predictions to reduce churn and vary customer communications

Powered by Cortex, customer-centric teams can predict a user’s likelihood to churn. Using that prediction, teams can deliver a unique set of experiences for users who have a high likelihood to churn.

![img workflow for this example](/images/journeys/ai-use-case.png)
    
In this example, a brand engages high-churn risk users on multiple channels to ensure they get the message. In addition, the brand sets up a fail safe for the remaining users, those who didn’t open any emails, engaging them over SMS.

#### Engage customers in the right channel based on customer consent

One key piece of user preference is their consent status, what they've told the brand about how they want their data to be used for marketing purposes.

![img workflow for this example](/images/journeys/compliance-use-case.png)
   
In this example, an eCommerce retailer delivers two different kinds of experiences based on a user's consent to GDPR. 
   
For example, if users have consented, the retailer retargets the user on paid media, showcasing the abandoned product as a reminder to convert. For the remaining users, those who have not consented, the retailer triggers an onsite coupon if the user returns after several days.

#### Trigger post-purchase sequences based on a customer's lifetime value

For many retailers, a user’s purchase of a product is just the beginning of the relationship between the customer and the brand. After a purchase, the retailer can suggest to the customer many possible next steps to prolong and deepen that relationship: purchasing more products, leaving a review, referring a friend, posting on social media, and more.

![img workflow for this example](/images/journeys/user-context-use-case.png)
    
In this example, retailers trigger the next best step based on a user’s lifetime value.  For high LTV customers, brands can assume that they’re fans of the brand, and would be more willing to refer a friend. If the retailer knows a loyal customer’s preferred engagement channel, they can communicates with them there. For the remaining users, those who are not high LTV customers, a retailer can recommend products that pair well with the one that a customer just purchased. 

### Audience estimator

Each audience that you create in a journey provides an estimated audience size immediately, so that you don't have to wait for the audience calculation to complete. Once an audience has at least one active connection, audiences and all parent audiences in same branch begin calculating the real size. When an audience begins calculating it no longer shows the estimated size.

To estimate the audience size quickly, mParticle samples the total number of users. 

You see the estimated size of the audience with all criteria applied (as shown in the previous image). Estimated audience size per criteria is also displayed on the milestone:

![image of an estimated audience from the milestone](/images/journeys/est-milestone.jpg)

Use the audience estimator's immediate feedback to adjust criteria definitions and parameters if needed:

* The audience size is much bigger or much smaller than expected.
* Your team wants to explore different ways to target your customers.
* You see a big drop-off of users between milestones and want to target an intermediary moment in the journey, to nudge more users toward your conversion goal. For example, in the following journey, each successive audience has a very large drop-off that you might want to target:

    ![image of a journey with large drop-off](/images/journeys/est-overall.jpg)

After the audience has been calculated, the display changes to show the actual audience size.

In some cases, you may see different symbols instead of an estimated size:

* The symbol **~** indicates that the population is too small relative to the overall user base, which prevents a meaningful calculation. For example, imagine a company that has 100 million users. If you create an audience that will have 13,000 members when fully calculated, it's likely that the random sample won't encounter enough members to be represented in the estimate. This symbol doesn't mean your audience will have no members, just that it will have so few members relative to the total number of users that estimation isn't possible. 
* If an audience can't be estimated for a technical reason, you'll see a red triangle with an exclamation point instead of an estimated size. For example, if the input is not configured correctly, you'll see this warning sign.

## Before you start

After you have been accepted into the Beta program, prepare for creating a journey:

* Define what goals you wish to accomplish with the journey. For example, do you want to convert trial users to paid users, or encourage infrequent viewers to engage with their content? The goal you wish to accomplish will affect which inputs you select, and the criteria you'll define for each audience.

* Verify that you can create the number of activated audiences you plan to create in your journey. In mParticle, visit **Audiences > Real-time** to see how many activated audiences are available:

    <img alt="real-time audience counter" src="/images/journeys/active-audience-count.png" width="250">

## Create a journey

To create a journey:

1. Log in to your mParticle workspace and go to **Audiences > Journeys**, and click **New Journey**.
2. In the Create Journey configuration dialog, choose a name for your journey and select inputs from all the workspaces you wish to include. 
3. After selecting all the inputs in all the relevant workspaces, click **Create**.
4. The Journey canvas displays your selected journey inputs.
5. Click the plus sign to add a milestone, and then click **Milestone**.
6. Add a name, and then click the plus sign to define the criteria. You are now in the real-time audience builder, and can [define criteria](/guides/platform-guide/audiences/real-time/#audience-criteria).
7.  Click **Save**. The canvas displays the milestone you just created and the audience for that milestone. The audience can be activated using any mParticle audience [integration partner](/integrations/) as described in the last step. 
8.  Optionally, you can create a remaining user milestone by clicking the split icon above the milestone you just created. The icon isn't visible until a milestone is created.

    ![Split icon visible above a milestone](/images/journeys/save-first-milestone.png)

    Then, select **Add > Remaining Users Split**. You'll see a new branch is created. Note that the criteria is read only, since this is a milestone for all the users who did not fit the criteria of the milestone you created in step 7. 
    
    You can add more milestones to a remaining users milestone.
9.  Using the plus sign under any audience, you can either add a new milestone (repeat steps 6 and 7) or select an output for the audience you just created. For more information about output connections, see [Connections](/guides/platform-guide/audiences/real-time/#connect-an-audience). You can add none, one, or more output to each audience. 

After an audience is activated (by adding an output set to **Active**), the audience is updated to **Activated**. All parent audiences in that branch are set to "Calculating." Audience size estimates are updated to the actual audience size. 

After you've added all the milestones and outputs, you’ve fully defined the journey.

## Deactivate an audience

If you wish to stop sending audience updates to one of the connections in a journey, you must either deactivate or delete the connection for that audience. 

<aside>If you deactive an audience, the audience in that output partner system may get out of sync with mParticle. You may need to delete the audience in the downstream system to resync.</aside>

## Delete a journey

To delete a journey:

1. Go to **Audiences > Journeys** and click a journey to open it.
2. Click the milestone you wish to delete.
3. Click **Edit milestone**.
4. Click **Delete**.

Milestones must be removed from last to first.

## Journeys and billing

 When an audience is actively connected, that audience is activated and consumes a real-time audience credit. Unlike the real-time audience experience, there is no explicit audience status of Draft or Active. The status is now derived from the connection status.
 
 * Activated audiences count toward your account limit. 
 * Parent audiences are calculated, but do not consume additional real-time audience credits.

To view the number of audiences available to you, in mParticle go to **Audiences > Journeys > Settings**:

<img alt="journey audience counter" src="/images/journeys/journeys-audience-count.png" width="250">
