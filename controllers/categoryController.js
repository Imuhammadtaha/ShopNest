import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from "fs";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    if (!name) {
      return res.status(401).send({ message: "Name are required" });
    }
    if (!photo) {
      return res.status(401).send({ message: "Photo are required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }

    const category = new categoryModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }

    await category.save();
    return res.status(200).send({
      success: true,
      message: "New Category Has Been Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), photo },

      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Updating Category",
    });
  }
};

//getting all category
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting categories",
    });
  }
};

//For single Category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      category,
      message: "Single Category Fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While deleting Category",
      error,
    });
  }
};

//product photo
export const categoryPhotoController = async (req, res) => {
  try {
    const category = await categoryModel
      .findById(req.params.pid)
      .select("photo");
    if (category.photo.data) {
      res.set("Content-type", category.photo.contentType);
      return res.status(200).send(category.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting product photo",
      error,
    });
  }
};
