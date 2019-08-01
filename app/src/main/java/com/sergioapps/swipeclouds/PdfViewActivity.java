package com.sergioapps.swipeclouds;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.inputmethodservice.KeyboardView;
import android.net.Uri;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.CountDownTimer;
import android.os.Environment;
import android.support.annotation.RequiresApi;
import android.support.v4.content.FileProvider;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

//import android.support.design.widget.NavigationView;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.widget.AbsListView;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CompoundButton;
import android.widget.ListView;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.widget.Toolbar;
import android.support.v7.widget.*;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import com.sergioapps.swipeclouds.R;
import com.sergioapps.userdata.PDFFileDesriptor;
import com.sergioapps.utils.CheckForStuff;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

//import javax.inject.Inject;
//
//import butterknife.BindView;
//import butterknife.ButterKnife;

import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import static java.security.AccessController.getContext;

public class PdfViewActivity extends AppCompatActivity {

    //@Inject
    //DownloadedFilesPresenter<DownloadedFilesView, DownloadedFilesMvpInteractor> mPresenter;

    //@BindView(R.id.filesList)
    //ListView mListView;

    //@BindView(R.id.toolbar)
    //Toolbar mToolbar;

    //@BindView(R.id.drawer_view)
    //DrawerLayout mDrawer;

    //@BindView(R.id.navigation_view)
    //NavigationView mNavigationView;

    //private ArrayList<PDFFileDesriptor> filenames;

    //FilesListViewAdapter filesListViewAdapter;

    RecyclerView mRecyclerView;

    private static final int REQUEST_CODE=101;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_download_files);
        setContentView(R.layout.activity_pdfview);
        //getActivityComponent().inject(this);
        //setUnBinder(ButterKnife.bind(this));

        //setNavigationDrawer(mToolbar, mDrawer);
        //setNavigationMenu(this, mNavigationView, mDrawer);
        //setToolBarTitle(mToolbar, getString(R.string.downloaded_files));

        //initUI();
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        mRecyclerView = (RecyclerView) findViewById(R.id.recycler_view);
        setUpRecyclerView();

        //mPresenter.onAttach(this);
    }


    /**
     * Initiates the activity by setting text to the textview and assigning listener for switch.
     */
    //private void initUI() {
    //    ArrayList<PDFFileDesriptor> items = new ArrayList<>();
    //    items = FetchFiles();
    //    if(!(items == null))
    //    {
    //        filesListViewAdapter = new FilesListViewAdapter(items,getApplicationContext());
    //        mListView.setAdapter(filesListViewAdapter);
    //        mListView.setOnItemClickListener(this);
    //    }
    //}

    //private ArrayList<PDFFileDesriptor> FetchFiles() {
    //
    //    filenames = new ArrayList<PDFFileDesriptor>();
    //    String path = Environment.getExternalStorageDirectory() + File.separator + "ARC";
    //
    //    File directory = new File(path);
    //    File[] files = directory.listFiles();
    //    if(! (files == null))
    //        if(files.length > 0){
    //            for (int i = 0; i < files.length; i++)
    //            {
    //                PDFFileDesriptor fileDesriptor = new PDFFileDesriptor();
    //
    //                fileDesriptor.setFilename(files[i].getName());
    //
    //                SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    //                fileDesriptor.setDate(String.valueOf(sdf.format(files[i].lastModified())));
    //
    //                filenames.add(fileDesriptor);
    //            }
    //            return filenames;
    //        }else {
    //            Toast.makeText(getApplicationContext(),"No files downloaded",Toast.LENGTH_LONG).show();
    //        }
    //    return null;
    //}

    /**
     * Called once the hardware back button is pressed.
     */
    //@Override
    //public void onBackPressed() {
    //    if (!isDrawerClosed())
    //        CommonUtils.startFreshActivity(this, MainActivity.class, true);
    //}

    /**
     * Perform any final cleanup before an activity is destroyed and removes the Presenter.
     */
    @Override
    protected void onDestroy() {
        //mPresenter.onDetach();
        super.onDestroy();
    }

    /**
     * Returns the ApplicationContext.
     */
    //@Override
    //public Context getContext() {
    //    return getApplicationContext();
    //}

    /////////////////////////////////////////////////////////
    //@Override
    //public void onItemClick(AdapterView<?> adapterView, View view, int position, long l) {
    //
    //    File targetFile = new File(filenames.get(position).getFilename());
    //    //Uri targetUri = Uri.fromFile(targetFile);
    //
    //    Intent intent = new Intent(this,PDFViewerActivity.class);
    //    intent.putExtra("targetFile",targetFile);
    //    startActivity(intent);
    //}
    ////////////////////////////////////////////////////////





    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.menu_item_undo_checkbox) {
            item.setChecked(!item.isChecked());
            ((SwipeAdapter)mRecyclerView.getAdapter()).setUndoOn(item.isChecked());
        }
        //if (item.getItemId() == R.id.menu_item_add_5_items) {
        //    ((SwipeAdapter)mRecyclerView.getAdapter()).addItems(5);
        //}
        //if (item.getItemId() == R.id.menu_item_remove_items) {
        //    ((SwipeAdapter)mRecyclerView.getAdapter()).removeAllPdfs();
        //}
        return super.onOptionsItemSelected(item);
    }

    private void setUpRecyclerView() {
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        mRecyclerView.setAdapter(new SwipeAdapter());
        mRecyclerView.setHasFixedSize(true);
        setUpItemTouchHelper();
        setUpAnimationDecoratorHelper();
    }

    /**
     * This is the standard support library way of implementing "swipe to delete" feature.
     * You can do custom drawing in onChildDraw method but whatever you draw will disappear
     * once the swipe is over, and while the items are animating to their new position the
     * recycler view background will be visible. That is rarely an desired effect.
     */
    private void setUpItemTouchHelper() {

        ItemTouchHelper.SimpleCallback simpleItemTouchCallback =
                new ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT) {

            // we want to cache these and not allocate anything repeatedly in the onChildDraw method
            Drawable background;
            Drawable xMark;
            int xMarkMargin;
            boolean initiated;

            private void init() {
                background = new ColorDrawable(Color.RED);
                xMark = ContextCompat.getDrawable(PdfViewActivity.this, R.drawable.ic_clear_24dp);
                xMark.setColorFilter(Color.WHITE, PorterDuff.Mode.SRC_ATOP);
                xMarkMargin = (int) PdfViewActivity.this.getResources().getDimension(R.dimen.ic_clear_margin);
                initiated = true;
            }

            // not important, add drag and drop here if you want it
            @Override
            public boolean onMove(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, RecyclerView.ViewHolder target) {
                return false;
            }


            @Override
            public int getSwipeDirs(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder) {
                int position = viewHolder.getAdapterPosition();
                SwipeAdapter SwipeAdapter = (SwipeAdapter)recyclerView.getAdapter();
                if (SwipeAdapter.isUndoOn() && SwipeAdapter.isPendingRemoval(position)) {
                    return 0;
                }
                return super.getSwipeDirs(recyclerView, viewHolder);
            }

            @Override
            public void onSwiped(RecyclerView.ViewHolder viewHolder, int swipeDir) {
                int swipedPosition = viewHolder.getAdapterPosition();
                SwipeAdapter adapter = (SwipeAdapter)mRecyclerView.getAdapter();
                boolean undoOn = adapter.isUndoOn();

                undoOn = false;
                if (undoOn) {
                    adapter.pendingRemoval(swipedPosition);
                } else {
                    adapter.remove(swipedPosition);
                }
            }

            @Override
            public void onChildDraw(Canvas c, RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, float dX, float dY, int actionState, boolean isCurrentlyActive) {
                View itemView = viewHolder.itemView;

                // not sure why, but this method get's called for viewholder that are already swiped away
                if (viewHolder.getAdapterPosition() == -1) {
                    // not interested in those
                    return;
                }

                if (!initiated) {
                    init();
                }

                // draw red background
                background.setBounds(itemView.getRight() + (int) dX, itemView.getTop(), itemView.getRight(), itemView.getBottom());
                background.draw(c);

                // draw x mark
                int itemHeight = itemView.getBottom() - itemView.getTop();
                int intrinsicWidth = xMark.getIntrinsicWidth();
                int intrinsicHeight = xMark.getIntrinsicWidth();

                int xMarkLeft = itemView.getRight() - xMarkMargin - intrinsicWidth;
                int xMarkRight = itemView.getRight() - xMarkMargin;
                int xMarkTop = itemView.getTop() + (itemHeight - intrinsicHeight)/2;
                int xMarkBottom = xMarkTop + intrinsicHeight;
                xMark.setBounds(xMarkLeft, xMarkTop, xMarkRight, xMarkBottom);

                xMark.draw(c);

                super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive);

            }

        };
        ItemTouchHelper mItemTouchHelper = new ItemTouchHelper(simpleItemTouchCallback);
        mItemTouchHelper.attachToRecyclerView(mRecyclerView);

    }



    /**
     * We're gonna setup another ItemDecorator that will draw the red background in the empty space while the items are animating to thier new positions
     * after an item is removed.
     */
    private void setUpAnimationDecoratorHelper() {
        mRecyclerView.addItemDecoration(new RecyclerView.ItemDecoration() {

            // we want to cache this and not allocate anything repeatedly in the onDraw method
            Drawable background;
            boolean initiated;

            private void init() {
                background = new ColorDrawable(Color.RED);
                initiated = true;
            }

            @Override
            public void onDraw(Canvas c, RecyclerView parent, RecyclerView.State state) {

                if (!initiated) {
                    init();
                }

                // only if animation is in progress
                if (parent.getItemAnimator().isRunning()) {

                    // some items might be animating down and some items might be animating up
                    // to close the gap left by the removed item this is not exclusive, both
                    // movement can be happening at the same time to reproduce this leave just
                    // enough items so the first one and the last one would be just a little
                    // off screen then remove one from the middle

                    // find first child with translationY > 0
                    // and last one with translationY < 0
                    // we're after a rect that is not covered in recycler-view views at this point in time
                    View lastViewComingDown = null;
                    View firstViewComingUp = null;

                    // this is fixed
                    int left = 0;
                    int right = parent.getWidth();

                    // this we need to find out
                    int top = 0;
                    int bottom = 0;

                    // find relevant translating views
                    int childCount = parent.getLayoutManager().getChildCount();
                    for (int i = 0; i < childCount; i++) {
                        View child = parent.getLayoutManager().getChildAt(i);
                        if (child.getTranslationY() < 0) {
                            // view is coming down
                            lastViewComingDown = child;
                        } else if (child.getTranslationY() > 0) {
                            // view is coming up
                            if (firstViewComingUp == null) {
                                firstViewComingUp = child;
                            }
                        }
                    }

                    if (lastViewComingDown != null && firstViewComingUp != null) {
                        // views are coming down AND going up to fill the void
                        top = lastViewComingDown.getBottom() + (int) lastViewComingDown.getTranslationY();
                        bottom = firstViewComingUp.getTop() + (int) firstViewComingUp.getTranslationY();
                    } else if (lastViewComingDown != null) {
                        // views are going down to fill the void
                        top = lastViewComingDown.getBottom() + (int) lastViewComingDown.getTranslationY();
                        bottom = lastViewComingDown.getBottom();
                    } else if (firstViewComingUp != null) {
                        // views are coming up to fill the void
                        top = firstViewComingUp.getTop();
                        bottom = firstViewComingUp.getTop() + (int) firstViewComingUp.getTranslationY();
                    }

                    background.setBounds(left, top, right, bottom);
                    background.draw(c);

                }
                super.onDraw(c, parent, state);
            }

        });
    }

    /**
     * RecyclerView adapter enabling undo on a swiped away item.
     */
    class SwipeAdapter extends RecyclerView.Adapter {

        private RecyclerView.Adapter mOnItemClickListener;

        private static final int PENDING_REMOVAL_TIMEOUT = 3000; // 3sec

        private RecyclerViewClickListener mListener;
        SwipeAdapter(RecyclerViewClickListener listener) {
            mListener = listener;
        }

        ArrayList<PDFFileDesriptor> items = new ArrayList<>();
        ArrayList<PDFFileDesriptor> itemsPendingRemoval = new ArrayList<>();

        int lastInsertedIndex; // so we can add some more items for testing purposes
        boolean undoOn = false; // set this to true to restore deleted files

        private Handler handler = new Handler(); // hanlder for running delayed runnables
        // map of items to pending runnables, so we can cancel a removal if need be
        HashMap<String, Runnable> pendingRunnables = new HashMap<>();

        public SwipeAdapter() {
            items = new ArrayList<PDFFileDesriptor>();
            itemsPendingRemoval = new ArrayList<PDFFileDesriptor>();
            String path = Environment.getExternalStorageDirectory() + File.separator + "ARC";
            File directory = new File(path);
            File[] files = directory.listFiles();
            if(! (files == null))
                if(files.length > 0){
                    for (int i = 0; i < files.length; i++)
                    {
                        PDFFileDesriptor fileDesriptor = new PDFFileDesriptor();
                        fileDesriptor.setFilename(files[i].getName());
                        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
                        fileDesriptor.setDate(String.valueOf(sdf.format(files[i].lastModified())));
                        items.add(fileDesriptor);

                    }
                }else {
                    Toast.makeText(getApplicationContext(),"No files downloaded",Toast.LENGTH_LONG).show();
                }

            lastInsertedIndex = items.size();
        }

        @Override
        public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            return new TestViewHolder(parent);
        }

        @Override
        public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
            TestViewHolder viewHolder = (TestViewHolder)holder;
            final PDFFileDesriptor item = items.get(position);

            ((TestViewHolder) holder).titleTextView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    //Toast.makeText(getApplicationContext(),"Eureka!",Toast.LENGTH_LONG).show();
                    String fileName = item.getFilename();
                    String path = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + "ARC";
                    File file = new File(path, item.getFilename());
                    Intent target = new Intent("android.intent.action.VIEW");

                    try {
                        (new CheckForStuff()).openFile((Activity)v.getContext(), file);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    //File targetFile = new File(filenames.get(position).getFilename());
                    //Uri targetUri = Uri.fromFile(targetFile);
                    //Intent intent = new Intent(this,PDFViewerActivity.class);
                    //intent.putExtra("targetFile",targetFile);
                    //startActivity(intent);
                }
            });


            if (itemsPendingRemoval.contains(item)) {
                // we need to show the "undo" state of the row
                viewHolder.itemView.setBackgroundColor(Color.RED);
                viewHolder.titleTextView.setVisibility(View.GONE);
                viewHolder.undoButton.setVisibility(View.VISIBLE);
                viewHolder.undoButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        // user wants to undo the removal, let's cancel the pending task
                        Runnable pendingRemovalRunnable = pendingRunnables.get(item);
                        pendingRunnables.remove(item);
                        if (pendingRemovalRunnable != null) handler.removeCallbacks(pendingRemovalRunnable);
                        itemsPendingRemoval.remove(item);
                        // this will rebind the row in "normal" state
                        notifyItemChanged(items.indexOf(item));
                    }
                });
            } else {
                // we need to show the "normal" state
                viewHolder.itemView.setBackgroundColor(Color.WHITE);
                viewHolder.titleTextView.setVisibility(View.VISIBLE);
                viewHolder.titleTextView.setText(item.getFilename());
                viewHolder.undoButton.setVisibility(View.GONE);
                viewHolder.undoButton.setOnClickListener(null);
            }
        }

        @Override
        public int getItemCount() {
            return items.size();
        }

        public void setUndoOn(boolean undoOn) {
            this.undoOn = undoOn;
        }

        public boolean isUndoOn() {
            return undoOn;
        }

        public void pendingRemoval(int position) {
            Log.w("TEST", "pendingRemoval fired");
            final PDFFileDesriptor item = items.get(position);
            if (!itemsPendingRemoval.contains(item)) {
                itemsPendingRemoval.add(item);
                // this will redraw row in "undo" state
                notifyItemChanged(position);
                // let's create, store and post a runnable to remove the item
                Runnable pendingRemovalRunnable = new Runnable() {
                    @Override
                    public void run() {
                        remove(items.indexOf(item));
                    }
                };
                handler.postDelayed(pendingRemovalRunnable, PENDING_REMOVAL_TIMEOUT);
                pendingRunnables.put(item.getFilename(), pendingRemovalRunnable);
            }
        }

        public void remove(int position) {

            PDFFileDesriptor item = items.get(position);
            if (itemsPendingRemoval.contains(item)) {
                itemsPendingRemoval.remove(item);
            }
            if (items.contains(item)) {
                items.remove(position);
                notifyItemRemoved(position);
            }

            try {
                File f = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + "ARC" , item.getFilename());
                f.delete();
            } catch(Exception ioException) {
                ioException.printStackTrace();
            }
        }

        public boolean isPendingRemoval(int position) {
            PDFFileDesriptor item = items.get(position);
            return itemsPendingRemoval.contains(item);
        }

    }

    public class RowViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        private RecyclerViewClickListener mListener;

        RowViewHolder(View v, RecyclerViewClickListener listener) {
            super(v);
            mListener = listener;
            v.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            mListener.onClick(view, getAdapterPosition());
        }
    }

    /**
     * ViewHolder capable of presenting two states: "normal" and "undo" state.
     */
    static class TestViewHolder extends RecyclerView.ViewHolder {

        TextView titleTextView;
        Button undoButton;

        public TestViewHolder(ViewGroup parent) {
            super(LayoutInflater.from(parent.getContext()).inflate(R.layout.row_view, parent, false));
            titleTextView = (TextView) itemView.findViewById(R.id.title_text_view);
            undoButton = (Button) itemView.findViewById(R.id.undo_button);
        }

    }

    private class RecyclerViewClickListener {
        public void onClick(View view, int adapterPosition) {
        }
    }

}



//final SwipeToDismissTouchListener<ListViewAdapter> touchListener =
//    new SwipeToDismissTouchListener<>(
//        new ListViewAdapter(mListView),
//        new SwipeToDismissTouchListener.DismissCallbacks<ListViewAdapter>() {
//            @Override
//            public boolean canDismiss(int position) {
//                return true;
//            }
//
//            @Override
//            public void onPendingDismiss(ListViewAdapter recyclerView, int position) {
//
//            }
//
//            @Override
//            public void onDismiss(ListViewAdapter view, int position) {
//                customAdapter.remove(position);
//            }
//        });
//
//    mListView.setOnTouchListener(touchListener);
//    mListView.setOnScrollListener((AbsListView.OnScrollListener) touchListener.makeScrollListener());
//    mListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
//        @Override
//        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
//            if (touchListener.existPendingDismisses()) {
//                touchListener.undoPendingDismiss();
//            } else {
//                Toast.makeText(DownloadedFilesActivity.this, "Position " + position, Toast.LENGTH_LONG).show();
//            }
//        }
//    });
//
//}